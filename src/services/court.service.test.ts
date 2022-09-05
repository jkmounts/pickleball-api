import dbService from './db.service';
import courtService from './court.service';

jest.mock('./db.service');

describe('Court Service', () => {
  describe('#all()', () => {
    it('calls db.service.read', async () => {
      (dbService.read as jest.Mock).mockResolvedValue('res');
      const courts = new courtService();
      await courts.all();
      expect((dbService.read as jest.Mock).mock.calls.length).toBe(1);
    });
    it('returns response from db service', async () => {
      (dbService.read as jest.Mock).mockResolvedValue('some response object');
      const courts = new courtService();
      const res = await courts.all();
      expect(res).toBe('some response object');
    });
  });
  describe('#add(court)', () => {
    const mockCourt = {
      name: 'Court #1',
    };
    it('calls db.service.createNode', async () => {
      (dbService.createNode as jest.Mock).mockResolvedValue('res');
      const courts = new courtService();
      await courts.add(mockCourt);
      expect((dbService.createNode as jest.Mock).mock.calls.length).toBe(1);
      expect((dbService.createNode as jest.Mock).mock.calls[0][0]).toBe('Court');
      expect((dbService.createNode as jest.Mock).mock.calls[0][1]).toBe(mockCourt);
    });
    it('returns response from db service', async () => {
      (dbService.createNode as jest.Mock).mockResolvedValue('some response object');
      const courts = new courtService();
      const res = await courts.add(mockCourt);
      expect(res).toBe('some response object');
    });
  });
});