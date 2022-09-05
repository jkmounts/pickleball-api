import dbService from './db.service';
import facilityService from './facility.service';

jest.mock('./db.service');

describe('Facility Service', () => {
  beforeEach(() => {
    jest.mock('./db.service');
  });
  afterEach(() => {
    jest.restoreAllMocks;
  });
  describe('#all()', () => {
    it('calls db.service.read', async () => {
      (dbService.read as jest.Mock).mockResolvedValue('res');
      const facilities = new facilityService();
      await facilities.all();
      expect((dbService.read as jest.Mock).mock.calls.length).toBe(1);
    });
    it('sends correct query', async () => {
      (dbService.read as jest.Mock).mockResolvedValue('res');
      const facilities = new facilityService();
      await facilities.all();
      expect((dbService.read as jest.Mock).mock.calls[0][0]).toContain('MATCH (facility:Facility)');
      expect((dbService.read as jest.Mock).mock.calls[0][0]).toContain('return facility');
    });
    it('returns response from db service', async () => {
      (dbService.read as jest.Mock).mockResolvedValue('some response object');
      const facilities = new facilityService();
      const res = await facilities.all();
      expect(res).toBe('some response object');
    });
  });
  describe('#add(facility)', () => {
    const mockFacility = {
      name: 'Facility #1',
      address: '100 Main St',
      city: 'Louisville',
      state: 'KY',
      public: true,
    };
    it('calls db.service.createNode', async () => {
      (dbService.createNode as jest.Mock).mockResolvedValue('res');
      const facilities = new facilityService();
      await facilities.add(mockFacility);
      expect((dbService.createNode as jest.Mock).mock.calls.length).toBe(1);
      expect((dbService.createNode as jest.Mock).mock.calls[0][0]).toBe('Facility');
      expect((dbService.createNode as jest.Mock).mock.calls[0][1]).toBe(mockFacility);
    });
    it('returns response from db service', async () => {
      (dbService.createNode as jest.Mock).mockResolvedValue('some response object');
      const facilities = new facilityService();
      const res = await facilities.add(mockFacility);
      expect(res).toBe('some response object');
    });
  });
});