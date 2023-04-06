import request from 'supertest';
import app from './server';

test('getStore returns the store', (done) => {
    request(app)
        .get('/store/provo')
        .expect(200)
        .expect({ name: 'provo'})
        .end((err => (err) ? done(err) : done()));
});
        

