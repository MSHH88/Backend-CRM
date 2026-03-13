'use strict';

/**
 * Swagger/OpenAPI documentation configuration.
 */

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CURIA CRM API',
      version: '1.0.0',
      description: 'Backend API for CURIA CRM and Window/Door Configurator E-Commerce Platform',
    },
    servers: [
      {
        url: '/api/v1',
        description: 'API v1',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        PricingOptions: {
          type: 'object',
          properties: {
            discountRate: {
              type: 'number',
              description: 'Flat discount rate (0-1). 0.40 = 40%',
              example: 0,
            },
            productDiscount: {
              type: 'number',
              description: 'Product-specific discount (highest priority)',
            },
            categoryDiscount: {
              type: 'number',
              description: 'Category-level discount',
            },
            globalDiscount: {
              type: 'number',
              description: 'Global discount for all products',
            },
            quantity: {
              type: 'integer',
              description: 'Number of items',
              default: 1,
            },
            quantityTiers: {
              type: 'array',
              description: 'Volume discount tiers',
              items: {
                type: 'object',
                properties: {
                  minQuantity: { type: 'integer' },
                  discountPercent: { type: 'number' },
                },
              },
            },
            showVat: {
              type: 'boolean',
              description: 'Include VAT in response',
              default: true,
            },
            vatRate: {
              type: 'number',
              description: 'VAT rate as decimal',
              default: 0.19,
            },
          },
        },
        Configuration: {
          type: 'object',
          required: ['breite', 'hoehe', 'profil'],
          properties: {
            breite: {
              type: 'integer',
              description: 'Width in mm (400-2400)',
              example: 1000,
            },
            hoehe: {
              type: 'integer',
              description: 'Height in mm (400-2400)',
              example: 1000,
            },
            profil: {
              type: 'string',
              description: 'Profile ID (p1-p7)',
              example: 'p1',
            },
            verglasung: { type: 'string', example: 'g1' },
            aussenfarbe: { type: 'string', example: 'fs1_01' },
            innenfarbe: { type: 'string', example: 'fi1_01' },
          },
        },
      },
    },
    paths: {
      '/berechnen': {
        post: {
          summary: 'Calculate window price',
          tags: ['Pricing'],
          requestBody: {
            content: {
              'application/x-www-form-urlencoded': {
                schema: {
                  type: 'object',
                  properties: {
                    tmp_obj: { type: 'string', description: 'JSON-encoded configuration' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'HTML price calculation result' },
            400: { description: 'Invalid configuration' },
          },
        },
      },
      '/warenkorb': {
        post: {
          summary: 'Add item to cart',
          tags: ['Cart'],
          requestBody: {
            content: {
              'application/x-www-form-urlencoded': {
                schema: {
                  type: 'object',
                  properties: {
                    tmp_obj: { type: 'string', description: 'JSON-encoded configuration' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'JSON cart item' },
            400: { description: 'Invalid configuration' },
          },
        },
      },
      '/options': {
        get: {
          summary: 'Get all configurator options',
          tags: ['Configuration'],
          responses: {
            200: { description: 'Available options (profiles, surcharges, dimensions)' },
          },
        },
      },
      '/auth/register': {
        post: {
          summary: 'Register a new user',
          tags: ['Authentication'],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string', minLength: 8 },
                    firstName: { type: 'string' },
                    lastName: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'User registered successfully' },
            400: { description: 'Validation error' },
            409: { description: 'Email already exists' },
          },
        },
      },
      '/auth/login': {
        post: {
          summary: 'Login with email and password',
          tags: ['Authentication'],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Login successful, tokens returned' },
            401: { description: 'Invalid credentials' },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
