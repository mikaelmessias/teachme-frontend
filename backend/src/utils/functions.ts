import express, { Handler } from 'express';
import path from 'path';

export const pathResolve = (...pathSegments: string[]): Handler => express.static(
  path.resolve(...pathSegments),
);
