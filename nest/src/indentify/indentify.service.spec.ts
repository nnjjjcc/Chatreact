import { Test, TestingModule } from '@nestjs/testing';
import { IndentifyService } from './indentify.service';

describe('IndentifyService', () => {
  let service: IndentifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndentifyService],
    }).compile();

    service = module.get<IndentifyService>(IndentifyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
