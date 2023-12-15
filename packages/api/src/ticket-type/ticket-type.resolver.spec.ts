import { Test, TestingModule } from '@nestjs/testing';
import { TicketTypeResolver } from './ticket-type.resolver';
import { TicketTypeService } from './ticket-type.service';

describe('TicketTypeResolver', () => {
  let resolver: TicketTypeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketTypeResolver, TicketTypeService],
    }).compile();

    resolver = module.get<TicketTypeResolver>(TicketTypeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
