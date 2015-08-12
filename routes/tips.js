import { Router } from 'express';
import Tip from '../models/tip';
import scopify from '../helpers/scopify';
import { needs, needsApprovedIndex, needsApprovedOne} from '../middleware/permissions';
import jwt from '../middleware/jwt';

var router = Router();

router
  .route('/')
    .get(jwt, needsApprovedIndex('tips'), (req, res, next) => {
      var scopes = scopify(req.query, 'body', 'user');
      Tip.paginate(scopes, req.query.perPage, req.query.page)
        .then(body => res.send(body))
        .catch(err => next(err));
    })
    .post((req, res, next) => {
      req.body.userId = req.auth.user.id;
      Tip.create(req.body, {fields: ['body', 'userId']})
        .then(tip => res.send(tip))
        .catch(err => {
          err.status = 422;
          next(err);
        });
    });

router
  .route('/:id')
    .get(jwt, needsApprovedOne('tips'), (req, res, next) => {
      Tip
        .findById(req.params.id)
        .then(tip => {
          if (tip) {
            if (!tip.approved && !req.auth.allowed) {
              return next({
                message: `User does not have permission: unapproved tips`,
                status: 403
              });
            }
            res.send(tip);
          } else {
            next({ message: 'Tip not found', status: 404 });
          }
        })
        .catch(err => next(err));
    })
    .put(needs('tips', 'update'), (req, res, next) => {
      Tip
        .findById(req.params.id)
        .then(tip => {
          if (tip) {
            return tip.updateAttributes(req.body, {
              fields: ['body', 'userId', 'approved']
            });
          } else {
            next({ message: 'Tip not found', status: 404 });
          }
        })
        .then(tip => {
          if (tip) {
            res.send(tip);
          }
        })
        .catch(err => next(err));
    })
    .delete(needs('tips', 'destroy'), (req, res, next) => {
      Tip
        .findById(req.params.id)
        .then(tip => {
          if (tip) {
            return tip.destroy();
          } else {
            next({ message: 'Tip not found', status: 404 });
          }
        })
        .then(tip => {
          if (tip){
            res.sendStatus(204);
          }
        })
        .catch(err => next(err));
    });

export default router;
