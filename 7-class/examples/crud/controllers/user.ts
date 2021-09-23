import { Request, Response } from 'express';
import { User, UserAttributes } from '../models/user';

export class UserController {

    constructor() { }

    readAll(req: Request, res: Response) {
        User.findAll()
            .then((users: UserAttributes[]) => {
                res.json(users);
            })
            .catch((err: any) => {
                res.json(err);
            });
    }

    read(req: Request, res: Response) {
        User.findByPk(req.params.id)
            .then((user: UserAttributes | null) => {
                if (user) {
                    res.json(user);
                } else {
                    res.status(204).send();
                }
            })
            .catch((err: any) => {
                res.json(err);
            });
    }

    create(req: Request, res: Response) {
        User.create(req.body)
            .then((user: UserAttributes) => {
                res.json(user);
            })
            .catch((err: any) => {
                res.json(err);
            });
    }

    update(req: Request, res: Response) {
        User.update(req.body, {
            fields: ["id", "username"],
            where: { id: req.params.id }
        }).then((affectedRows: [number, UserAttributes[]]) => {
            res.json({
                affectedRows: Number(affectedRows)
            });
        }).catch((err: any) => {
            res.json(err);
        })
    }

    delete(req: Request, res: Response) {
        User.destroy({
            where: { id: req.params.id }
        })
            .then((removedRows: number) => {
                res.json({
                    removedRows: removedRows
                });
            }).catch((err: any) => {
                res.json(err);
            })

    }
}