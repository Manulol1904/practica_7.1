const app = require('../app.js');
const request = require('supertest')(app);

describe('GET', function(){

  it('respuesta contiene text/html', function(done){
    request
      .get('/')
      .set('Accept', 'text/html')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });

  it('respuesta contiene George Orwell', function(done){
    request
      .get('/')
      .set('Accept', 'text/html')
      .expect(200, /George Orwell had a farm/ig, done);
  });

  it('/api respuesta contiene json', function(done){
    request
      .get('/api')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('/api respuesta contiene objeto animales', function(done){
    request
      .get('/api')
      .set('Accept', 'application/json')
      .expect(200)
      .expect(res => {
        const expected = {
          cat: "meow",
          dog: "bark",
          eel: "hiss",
          bear: "growl",
          frog: "croak",
          lion: "roar",
          bird: "tweet"
        };

        // Validar que los originales estén correctos
        Object.keys(expected).forEach(key => {
          if (res.body[key] !== expected[key]) {
            throw new Error(`Falta o incorrecto: ${key}`);
          }
        });

        // Validar el nuevo animal (pato)
        if (res.body.duck !== 'cuac') {
          throw new Error('Falta duck o valor incorrecto');
        }
      })
      .end(done);
  });

});