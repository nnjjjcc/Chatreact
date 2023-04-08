import { Test, TestingModule } from '@nestjs/testing';
import { IndentifyController } from './indentify.controller';

describe('IndentifyController', () => {
  let controller: IndentifyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndentifyController],
    }).compile();

    controller = module.get<IndentifyController>(IndentifyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
