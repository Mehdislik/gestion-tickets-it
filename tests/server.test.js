const request = require('supertest');
const express = require('express');

// Importez votre application (vous pourriez avoir besoin d'exporter l'instance de l'app dans server.js)
const app = require('../src/server');

describe('GET /', () => {
  it('devrait retourner le message de bienvenue', async () => {
    const res = await request(app).get('/');
    expect(res.text).toEqual('Système de gestion des tickets IT');
    expect(res.statusCode).toEqual(200);
  });
});
