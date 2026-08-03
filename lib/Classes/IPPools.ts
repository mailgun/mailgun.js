/* eslint-disable camelcase */
import Request from './common/Request.js';

import {
  IPAddress,
  IpPoolCreateData,
  IpPoolCreateResponse,
  IpPoolCreateResult,
  IpPoolDeleteData,
  IpPoolDetails,
  IpPoolLinkedDomains,
  IpPoolLinkedDomainsQuery,
  IpPoolListResponse,
  IpPoolListResult,
  IpPoolMessageResponse,
  IpPoolMessageResult,
  IpPoolUpdateData,
} from '../Types/index.js';
import { IIPPoolsClient } from '../Interfaces/index.js';
import APIError from './common/Error.js';

export default class IpPoolsClient implements IIPPoolsClient {
  request: Request;

  constructor(request: Request) {
    this.request = request;
  }

  private isValidIp(ip: string): boolean {
    if (typeof ip !== 'string' || ip.length === 0) {
      return false;
    }

    if (ip.includes(':')) { // IPv6 address
      try {
        const parsedUrl = new URL(`http://[${ip}]`);
        return parsedUrl.hostname === `[${ip}]`;
      } catch {
        return false;
      }
    }

    const parts = ip.split('.');
    if (parts.length !== 4) {
      return false;
    }

    return parts.every((part) => {
      if (part.length === 0) {
        return false;
      }

      const value = Number(part);
      return Number.isInteger(value) && value >= 0 && value <= 255 && part === String(value);
    });
  }

  // List dedicated IP pools of the account
  // https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/ip-pools/get-v3-ip-pools
  async list(): Promise<IpPoolListResult> {
    const response: IpPoolListResponse = await this.request.get('/v3/ip_pools');
    return {
      status: response.status,
      ...response.body
    };
  }

  // Get dedicated IP pool details
  // https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/ip-pools/get-v3-ip-pools--pool-id-
  async get(poolId: string): Promise<IpPoolDetails> {
    const response = await this.request.get(`/v3/ip_pools/${poolId}`);
    return {
      status: response.status,
      ...response.body,
    };
  }

  // Add a new dedicated IP pool to the account
  // https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/ip-pools/post-v3-ip-pools
  async create(data: IpPoolCreateData): Promise<IpPoolCreateResult> {
    const response: IpPoolCreateResponse = await this.request.postWithFD('/v3/ip_pools', data);
    return {
      status: response.status,
      ...response.body
    };
  }

  // Edit dedicated IP pool
  // https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/ip-pools/patch-v3-ip-pools--pool-id-
  async update(poolId: string, data: IpPoolUpdateData): Promise<IpPoolMessageResult> {
    const response: IpPoolMessageResponse = await this.request.patchWithFD(`/v3/ip_pools/${poolId}`, data);
    return {
      status: response.status,
      ...response.body
    };
  }

  // Delete the dedicated IP pool
  // https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/ip-pools/delete-v3-ip-pools--pool-id-
  async delete(poolId: string, data: IpPoolDeleteData): Promise<IpPoolMessageResult> {
    const response:IpPoolMessageResponse = await this.request.delete(`/v3/ip_pools/${poolId}`, data);
    return {
      status: response.status,
      ...response.body
    };
  }

  // Get domains linked to dedicated IP pool
  // https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/ip-pools/get-v3-ip-pools--pool-id--domains
  async linkedDomains(
    poolId: string,
    query?: IpPoolLinkedDomainsQuery
  ): Promise<IpPoolLinkedDomains> {
    const response = await this.request.get(`/v3/ip_pools/${poolId}/domains`, query);
    return {
      status: response.status,
      ...response.body
    };
  }

  // Add an IP to a dedicated IP pool
  // https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/ip-pools/put-v3-ip-pools--pool-id--ips--ip-
  async addIp(poolId: string, ip: string): Promise<IpPoolMessageResult> {
    const response: IpPoolMessageResponse = await this.request.put(`/v3/ip_pools/${poolId}/ips/${ip}`);
    return {
      status: response.status,
      ...response.body
    };
  }

  // Remove an IP from a dedicated IP pool
  // https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/ip-pools/delete-v3-ip-pools--pool-id--ips--ip-
  async removeIp(poolId: string, ip: string): Promise<IpPoolMessageResult> {
    const response: IpPoolMessageResponse = await this.request.delete(`/v3/ip_pools/${poolId}/ips/${ip}`);
    return {
      status: response.status,
      ...response.body
    };
  }

  // Delegate dedicated IP pool to SubAccount
  // https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/ip-pools/put-v3-ip-pools--pool-id--delegate
  async delegate(poolId: string, subAccountId: string): Promise<IpPoolMessageResult> {
    const response: IpPoolMessageResponse = await this.request.putWithFD(`/v3/ip_pools/${poolId}/delegate`, { subaccount_id: subAccountId });
    return {
      status: response.status,
      ...response.body
    };
  }

  // Revoke dedicated IP pool from SubAccount
  // https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/ip-pools/delete-v3-ip-pools--pool-id--delegate
  async revokeDelegation(poolId: string, subAccountId: string): Promise<IpPoolMessageResult> {
    const response: IpPoolMessageResponse = await this.request.deleteWithFD(`/v3/ip_pools/${poolId}/delegate/`, { subaccount_id: subAccountId });
    return {
      status: response.status,
      ...response.body
    };
  }

  // Add multiple IPs to the dedicated IP pool
  // https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/ip-pools/post-v3-ip-pools--pool-id--ips-json
  async addIps(poolId: string, ips: string[]): Promise<IpPoolMessageResult> {
    const response: IpPoolMessageResponse = await this.request.post(`/v3/ip_pools/${poolId}/ips.json`, { ips });
    return {
      status: response.status,
      ...response.body
    };
  }

  // Remove an IP from the domain pool, unlink a DIPP or remove the domain pool
  // https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/ip-pools/delete-v3-domains--name--pool--ip-
  // Valid IP address 'all' -> this IP address will be removed from the domain pool.
  async removeIpFromDomainPool(
    domain: string,
    ip: IPAddress,
    replacementIp?: IPAddress
  ): Promise<IpPoolMessageResult> {
    if (!this.isValidIp(ip)) {
      throw APIError.getUserDataError(
        'Invalid IP address to remove from domain pool',
        `The provided IP address "${ip}" is not a valid IPv4 or IPv6 address.`
      );
    }

    if (replacementIp && (!this.isValidIp(replacementIp) || replacementIp === 'shared')) {
      throw APIError.getUserDataError(
        'Invalid replacement IP address',
        `The provided replacement IP address "${replacementIp}" is not a valid IPv4 or IPv6 address.`
      );
    }

    const encodedIp = encodeURIComponent(ip);
    const encodedReplacementIp = replacementIp ? encodeURIComponent(replacementIp) : undefined;
    const query = encodedReplacementIp ? { ip: encodedReplacementIp } : undefined;
    const response: IpPoolMessageResponse = await this.request.delete(`/v3/domains/${encodeURIComponent(domain)}/pool/${encodedIp}`, undefined, query);
    return {
      status: response.status,
      ...response.body
    };
  }

  // Remove the entire domain pool
  // https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/ip-pools/delete-v3-domains--name--pool--ip-
  // 'all' -> the entire domain pool will be removed.
  // As far as the system is concerned, such domain will no longer exist.
  async removeDomainPool(domain: string): Promise<IpPoolMessageResult> {
    const response: IpPoolMessageResponse = await this.request.delete(`/v3/domains/${encodeURIComponent(domain)}/pool/all`);
    return {
      status: response.status,
      ...response.body
    };
  }

  // Unlink a dedicated IP pool from a domain
  // https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/ip-pools/delete-v3-domains--name--pool--ip-
  // 'ip_pool' -> the DIPP which is currently linked to the domain will be unlinked
  async unlinkDomainPool(
    domain: string,
    ipPool: string,
    replacementPoolId?: string
  ): Promise<IpPoolMessageResult> {
    const query = replacementPoolId ? {
      pool_id: encodeURIComponent(replacementPoolId)
    } : undefined;
    const response: IpPoolMessageResponse = await this.request.delete(`/v3/domains/${encodeURIComponent(domain)}/pool/${encodeURIComponent(ipPool)}`, undefined, query);
    return {
      status: response.status,
      ...response.body
    };
  }
}
