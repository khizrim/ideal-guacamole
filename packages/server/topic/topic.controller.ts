import type { RequestHandler } from 'express';

import { createTopicDto } from './topic.dto';
import { TopicService } from './topic.service';
import { logger } from '../utils';

export class TopicController {
  static getTopics: RequestHandler = async (_, res, next) => {
    try {
      const topics = await TopicService.getTopics();
      res.status(200).json(topics);
    } catch (e) {
      next(e);
    }
  };

  static createTopic: RequestHandler = async (req, res, next) => {
    const validation = createTopicDto.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ message: validation.error.errors });
    }

    try {
      const topic = await TopicService.createTopic(req.body);
      return res.status(201).json(topic);
    } catch (e) {
      logger.error(e);
      return next(e);
    }
  };
}
