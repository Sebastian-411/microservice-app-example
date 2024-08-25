'use strict';
const cache = require('memory-cache');
const { Annotation,
    jsonEncoder: { JSON_V2 } } = require('zipkin');

const OPERATION_CREATE = 'CREATE',
    OPERATION_DELETE = 'DELETE';

class TodoController {
    constructor({ tracer, redisClient, logChannel }) {
        this._tracer = tracer;
        this._redisClient = redisClient;
        this._logChannel = logChannel;
    }

    // TODO: these methods are not concurrent-safe
    list(req, res) {
        this._tracer.scoped(() => {
            const traceId = this._tracer.createChildId();
            this._tracer.setId(traceId);
            this._tracer.recordServiceName('todos-service');
            this._tracer.recordAnnotation(new Annotation.ServerRecv());

            const data = this._getTodoData(req.user.username);
            res.json(data.items);

            this._tracer.recordAnnotation(new Annotation.ServerSend());
        });
    }

    create(req, res) {
        this._tracer.scoped(() => {
            const traceId = this._tracer.createChildId();
            this._tracer.setId(traceId);
            this._tracer.recordServiceName('todos-service');
            this._tracer.recordAnnotation(new Annotation.ServerRecv());

            const data = this._getTodoData(req.user.username);
            const todo = {
                content: req.body.content,
                id: data.lastInsertedID
            };
            data.items[data.lastInsertedID] = todo;

            data.lastInsertedID++;
            this._setTodoData(req.user.username, data);

            this._logOperation(OPERATION_CREATE, req.user.username, todo.id);

            res.json(todo);

            this._tracer.recordAnnotation(new Annotation.ServerSend());
        });
    }

    delete(req, res) {
        this._tracer.scoped(() => {
            const traceId = this._tracer.createChildId();
            this._tracer.setId(traceId);
            this._tracer.recordServiceName('todos-service');
            this._tracer.recordAnnotation(new Annotation.ServerRecv());

            const data = this._getTodoData(req.user.username);
            const id = req.params.taskId;
            delete data.items[id];
            this._setTodoData(req.user.username, data);

            this._logOperation(OPERATION_DELETE, req.user.username, id);

            res.status(204).send();

            this._tracer.recordAnnotation(new Annotation.ServerSend());
        });
    }

    _logOperation(opName, username, todoId) {
        this._tracer.scoped(() => {
            const traceId = this._tracer.id;
            this._redisClient.publish(this._logChannel, JSON.stringify({
                zipkinSpan: traceId,
                opName: opName,
                username: username,
                todoId: todoId,
            }))
        })
    }

    _getTodoData(userID) {
        var data = cache.get(userID)
        if (data == null) {
            data = {
                items: {
                    '1': {
                        id: 1,
                        content: "Create new todo",
                    },
                    '2': {
                        id: 2,
                        content: "Update me",
                    },
                    '3': {
                        id: 3,
                        content: "Delete example ones",
                    }
                },
                lastInsertedID: 3
            }

            this._setTodoData(userID, data)
        }
        return data
    }

    _setTodoData(userID, data) {
        cache.put(userID, data)
    }
}

module.exports = TodoController