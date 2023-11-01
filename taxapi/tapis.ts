import * as express from 'express';
import Ajv from "ajv"

let expressRouter = express.Router();

let docSwagger: any = {
  "openapi": "3.0.0",
  "info": {
    "version": "1.0.0",
    "title": "APIs Documentation",
    "termsOfService": "",
    "contact": {
      "name": "Nowhereman",
      "email": "nowhere@man.com",
      "url": "https://www.google.com"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
    }
  },
  servers: [
  ],
  tags: [
  ],
  paths: {
  },
  components: {
    schemas: {
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      }
    }
  }
}

const emptyMiddleware = function (req: any, res: any, next: any) { next(); }

let summary: string = '';
let parameters: any = []
let requestBody: any = { content: {} }
let responses: any = {}
let tags: any = []
let security: any = []
let rootPath: string = ""

function root(root: string) {
  if(root[0]==='/')
    rootPath = root;
  else 
    rootPath = '/'+root;
}

function init() {
  summary = ''
  parameters = []
  tags = []
  responses = {}
  requestBody = { content: {} }
  security = []
}

function convertExpressRouteToSwagger(route: string): string {
  /** route express route/:var1/:var2 */
  const regex = /:([a-zA-Z0-9]+)\/*/gm;
  /** route swagger route/{var1}/{var2} */
  const subst = `{$1}/`;

  const result = route.replace(regex, subst);
  return result;
}

function concatPath(route: string): string {
  if(route[0]==='/')
    return rootPath+route
  else 
    return rootPath+'/'+route
}

/**
 * Decorator @GET, to define get express route and openapi definition 
 * @param route - path of the route
 * @param middleware - middleware call before the route
 */
function GET(route: string, middleware?: any) {
  const fullRoute = concatPath(route)
  if (middleware === undefined) { middleware = emptyMiddleware }
  else { security.push({ "bearerAuth": [] }) }
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    expressRouter.get(fullRoute, middleware, descriptor.value)
    const routeSwagger = convertExpressRouteToSwagger(fullRoute)
    docSwagger.paths[routeSwagger] = { get: { summary, parameters, tags, responses, operationId: 'get' + fullRoute, security } }
    init()
    return descriptor;
  }
}

/**
 * Decorator @POST, to define get express route and openapi definition 
 * @param route - path of the route
 * @param middleware - middleware call before the route
 */
function POST(route: string, middleware?: any) {
  const fullRoute = concatPath(route)
  if (middleware === undefined) { middleware = emptyMiddleware }
  else { security.push({ "bearerAuth": [] }) }
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    expressRouter.post(fullRoute, middleware, descriptor.value)
    const routeSwagger = convertExpressRouteToSwagger(fullRoute)
    docSwagger.paths[routeSwagger] = { post: { summary, parameters, tags, responses, operationId: 'post' + fullRoute, requestBody, security } }
    init()
    return descriptor;
  }
}

/**
 * Decorator @PUT, to define get express route and openapi definition 
 * @param route - path of the route
 * @param middleware - middleware call before the route
 */
function PUT(route: string, middleware?: any) {
  const fullRoute = concatPath(route)
  if (middleware === undefined) { middleware = emptyMiddleware }
  else { security.push({ "bearerAuth": [] }) }
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    expressRouter.put(fullRoute, middleware, descriptor.value)
    const routeSwagger = convertExpressRouteToSwagger(fullRoute)
    docSwagger.paths[routeSwagger] = { put: { summary, parameters, tags, responses, operationId: 'put' + fullRoute, requestBody, security } }
    init()
    return descriptor;
  }
}

/**
 * Decorator @DELETE, to define get express route and openapi definition 
 * @param route - path of the route
 * @param middleware - middleware call before the route
 */
function DELETE(route: string, middleware?: any) {
  const fullRoute = concatPath(route)
  if (middleware === undefined) { middleware = emptyMiddleware }
  else { security.push({ "bearerAuth": [] }) }
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    expressRouter.delete(fullRoute, middleware, descriptor.value)
    const routeSwagger = convertExpressRouteToSwagger(fullRoute)
    docSwagger.paths[routeSwagger] = { delete: { summary, parameters, tags, responses, operationId: 'delete' + fullRoute, security } }
    init()
    return descriptor;
  }
}

function JSONRESPONSE(status: string, description: string, schema: any) {
  responses[status] = { description, 'content': { "application/json": { schema } } }
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    return descriptor
  }
}

// function PATCH(target:any, propertyKey: string, descriptor: PropertyDescriptor) {
//     method = Method.PUT
//     return descriptor;test json body
// }

// function HEAD(target:any, propertyKey: string, descriptor: PropertyDescriptor) {
//     method = Method.HEAD
//     return descriptor;
// }

// function OPTIONS(target:any, propertyKey: string, descriptor: PropertyDescriptor) {
//     method = Method.OPTIONS
//     return descriptor;
// }

// function TRACE(target:any, propertyKey: string, descriptor: PropertyDescriptor) {
//     method = Method.TRACE
//     return descriptor;
// }

function SUMMARY(sum: string) {
  summary = sum
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    return descriptor;
  }
}
/**
 * 
 * @param name nom du parametre
 * @param type type du parametre 
 * @param where position parametre path | query
 */
function PARAMETERS(name: string = "name", type: string = "string", where: string = "query") {
  const parameter = { name, schema: { type }, in: where, required: true }
  parameters.push(parameter)
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function (...args: any[]) {

      if (parameter.required && parameter.in === 'query') {
        const req = args[0]
        let res = args[1]
        if (!Object.keys(req.query).includes(name)) {
          res.status(500);
          res.json('error missing parameter ' + name);
          return res;
        }
      }

      const result = method.apply(this, args);

      return result;
    }
    return descriptor;
  }
}

function PARAMETER(param: any = {}) {
  parameters.push(param)
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function (...args: any[]) {

      if (param.required) {
        const req = args[0]
        let res = args[1]
        if (!Object.keys(req.query).includes(param.name)) {
          res.status(500);
          res.json('error missing parameter ' + param.name);
          return res;
        }
      }

      const result = method.apply(this, args);

      return result;
    }
    return descriptor;
  }
}

function FILE(name: string, required: boolean = false) {
  if (!Object.keys(requestBody.content).includes("multipart/form-data")) {
    requestBody.content["multipart/form-data"] = {
      "schema": {
        "type": "object",
        "properties": {},
        "required": []
      }
    }
  }
  requestBody.content["multipart/form-data"]["schema"]["properties"][name] = { "type": "string", "format": "binary" }
  if (required) {
    requestBody.content["multipart/form-data"]["schema"]["required"].push(name)
  }
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function (...args: any[]) {

      if (required) {
        const req = args[0]
        let res = args[1]
        if (!Object.keys(req).includes("files") || req.files === null || !Object.keys(req.files).includes(name)) {
          res.status(500);
          res.json('error missing file ' + name);
          return res;
        }
      }

      const result = method.apply(this, args);

      return result;
    }
    return descriptor;
  }
}

/**
 * decorator @JSONBODY, to define the json body of the request
 * @param schema - schema JSON of the body
 * @param schemaName - name of the schema
 * @param description - description of the schema
 * @example -
 * ```
 *  @POST('/post1')
 *  @FILE("fichier", true)
 *  @JSONBODY(usrSch, "new_user_data")
 *  @JSONRESPONSE('200', "Refresh token for new User", strSch)
 *  fct1(req: express.Request, res: express.Response) {
 *    res.status(200).send({status:"OK"})
 *  }
 * ```
 */
function JSONBODY(schema: any, schemaName: string, description: string = "") {
  const flag = Object.keys(requestBody.content).includes("multipart/form-data") 
  if (flag) {
    requestBody.content["multipart/form-data"]["schema"]["properties"][schemaName] = schema
  } else {
    requestBody['required'] = true;
    requestBody['description'] = description
    requestBody.content["application/json"] = {
      "schema": { "$ref": "#/components/schemas/" + schemaName },
    }
  }

  if (schemaName)
    docSwagger.components.schemas[schemaName] = schema
  const ajv = new Ajv({ "allErrors": true }); // options can be passed, e.g. {allErrors: true}
  const validate = ajv.compile(schema);
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function (...args: any[]) {

      let res = args[1]
      try {
        const req = args[0]
        const data = flag ? JSON.parse(req.body[schemaName]) : req.body
        args[0].body = data

        const valid = ajv.validate(schema, data);
        if (!valid && validate.errors)
          return res.status(400).json({ "data": validate.errors[0].message })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ "data": "Invalid JSON" })
      }

      const result = method.apply(this, args);

      return result;
    }
    return descriptor;
  }
}

function TAG(name: string) {
  docSwagger.tags.push({ name })
  return function (constructor: Function) {
  }
}

function TAGS(...args: string[]) {
  tags = tags.concat(args)
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    return descriptor;
  }
}

function logger(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  if (process.env.NODE_ENV === 'development') {
    descriptor.value = function (...args: any[]) {

      // convert list of greet arguments to string
      const params = args.map(a => JSON.stringify(a)).join();

      // invoke greet() and get its return value
      const result = method.apply(this, args);

      // convert result to string
      const r = JSON.stringify(result);

      // display in console the function call details
      console.log(`Call: ${propertyKey}(${params}) => ${r}`);

      // return the result of invoking the method
      return result;
    }
  }

  return descriptor;
}

function RequestLogger(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  if (process.env.NODE_ENV === 'development') {
    descriptor.value = function (...args: any[]) {

      const req = args[0]

      console.log("--------Start Request-----------")
      console.log('URL:' + req.originalUrl)
      console.log('query params:' + JSON.stringify(req.query))
      console.log('path params:' + JSON.stringify(req.params))
      if (req.body) { console.log('body:' + JSON.stringify(req.body)) }
      if (req.files) { console.log('files:' + JSON.stringify(Object.keys(req.files).map((e) => req.files[e].name))) }

      const result = method.apply(this, args);
      // console.log('status Code:'+result.statusCode+'('+result.statusMessage+')')
      console.log("---------End Request------------")
      return result;
    }
  }

  return descriptor;
}


export {
  expressRouter,
  docSwagger,
  GET,
  POST,
  PUT,
  DELETE,
  SUMMARY,
  PARAMETER,
  PARAMETERS,
  TAG,
  TAGS,
  FILE,
  JSONBODY,
  JSONRESPONSE,
  logger,
  RequestLogger,
  root
}