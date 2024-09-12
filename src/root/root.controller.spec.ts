import { Test, TestingModule } from '@nestjs/testing';
import { RootController } from './root.controller';

describe('RootController', () => {
  let controller: RootController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RootController],
    }).compile();

    controller = module.get<RootController>(RootController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it('should return Api info', () => {
    const APP_VERSION = require('../../package.json').version;
    const APP_NAME = require('../../package.json').name;  

    expect(controller.getRoot()).toEqual({
      name: APP_NAME,
      version: APP_VERSION,
    });
  });
});
