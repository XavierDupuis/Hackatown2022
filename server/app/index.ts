// WARNING : Make sure to always import 'reflect-metadata' and 'module-alias/register' first
import 'reflect-metadata';
import 'module-alias/register';
import { Server } from '@app/server';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { Container } from 'typedi';

dotenv.config({ path: path.join(__dirname, './.env') });

const server: Server = Container.get(Server);
server.init();
