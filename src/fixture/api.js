import * as R from 'ramda';

import { nextID, createAssetNodes, createAssetNode } from './asset-node'

// Create a fixed collection of fixture asset nodes to use for response values.
const nodes = createAssetNodes();

/**
 * Get set of mock nodes
 */
export async function getMocks() {
  return nodes;
}

/**
 * Find a site's asset nodes.
 */
export async function find({
  site_id,
}) {
  // NOT IMPLEMENTED
}

/**
 * Find an asset node's children.
 */
export async function findChildren({
  node_id,
  site_id,
}) {
  // NOT IMPLEMENTED
}

/**
 * Update an asset node.
 */
export async function update({
  node_id,
  site_id,
}) {
  // NOT IMPLEMENTED
}

/**
 * Bulk delete asset nodes.
 */
export async function bulkDelete({
  node_ids,
  site_id,
}) {
  // NOT IMPLEMENTED
}

/**
 * Create an asset node.
 */
export async function create(node) {
  return {
    id: nextID(),
    ...node,
  };
}
