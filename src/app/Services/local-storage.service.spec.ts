import { async } from '@angular/core/testing';
import { Identity, LocalStorageService } from './local-storage.service';



describe('Local storage service', () => {

    beforeEach(() => { localStorage.clear(); });

    it('should create', () => {
        expect(new LocalStorageService()).toBeTruthy();
    });

    it('should create one item to local storage', () => {
        const service: LocalStorageService = new LocalStorageService();

        const item = { id: 0, title: 'Test data' };

        service.create('test-store', item).subscribe(() => {
            const itemsAsJSON = localStorage.getItem('test-store');

            const result: [] = JSON.parse(itemsAsJSON) as [];

            expect(1).toEqual(result.length);
        });
    });

    it('should create first item with self incremented id that equals to 1 in local storage', () => {
        const service: LocalStorageService = new LocalStorageService();

        const item = { id: 0, title: 'Test data' };

        service.create('test-store', item).subscribe(() => {
            const itemsAsJSON = localStorage.getItem('test-store');

            const result: any[] = JSON.parse(itemsAsJSON) as any[];

            const testItem = result[0];

            expect(1).toEqual(testItem.id);
        });
    });

    it('should create item in local storage', () => {
        const service: LocalStorageService = new LocalStorageService();

        const item = { id: 0, title: 'Test data' };

        service.create('test-store', item).subscribe(() => {
            const itemsAsJSON = localStorage.getItem('test-store');

            const result: any[] = JSON.parse(itemsAsJSON) as any[];

            const testItem = result[0];

            expect(item).toEqual(testItem);
        });
    });

    it('should get item successfully from local storage', () => {
        const service: LocalStorageService = new LocalStorageService();

        const item = { id: 0, title: 'Test data' };

        service.create('test-store', item).subscribe(() => {

            service.get('test-store', 1).subscribe(() => {
                const itemsAsJSON = localStorage.getItem('test-store');

                const result: any[] = JSON.parse(itemsAsJSON) as any[];

                const testItem = result[0];

                expect(item).toEqual(testItem);
            });
        });
    });

    it('should get all items successfully from local storage', () => {
        const service: LocalStorageService = new LocalStorageService();

        const items = [{ id: 0, title: 'Test data' }];

        service.create('test-store', items[0]).subscribe(() => {

            service.getAll('test-store').subscribe(() => {
                const itemsAsJSON = localStorage.getItem('test-store');

                const result: any[] = JSON.parse(itemsAsJSON) as any[];

                expect(items).toEqual(result);
            });
        });
    });

    it('should delete item successfully from local storage', () => {
        const service: LocalStorageService = new LocalStorageService();

        const item = { id: 0, title: 'Test data' };

        service.create('test-store', item).subscribe(() => {

            service.delete('test-store', 1).subscribe(() => {
                const itemsAsJSON = localStorage.getItem('test-store');

                const result: any[] = JSON.parse(itemsAsJSON) as any[];

                const searchResult = result.find(testItem => testItem.title === 'Test data');

                expect(!searchResult).toBeTruthy();
            });
        });
    });

    it('should delete all items successfully from local storage', () => {
        const service: LocalStorageService = new LocalStorageService();

        const item = { id: 0, title: 'Test data' };

        service.create('test-store', item).subscribe(() => {
            service.deleteAll('test-store');

            const itemsAsJSON = localStorage.getItem('test-store');

            expect(!itemsAsJSON).toBeTruthy();
        });
    });
});
