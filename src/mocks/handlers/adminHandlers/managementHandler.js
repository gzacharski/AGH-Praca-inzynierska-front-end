import { rest } from 'msw';
import { discoveryServiceURL } from 'src/main/data/urls';

export const managementHandlers = [
   rest.get(`${discoveryServiceURL}/admin/registry`, (req, res, ctx) =>
      res(
         ctx.status(200),
         ctx.delay(),
         ctx.json([
            {
               name: 'GYMPASS',
               instance: [
                  {
                     instanceId: 'gympass:21ebb5601f1ab4dbf34dcd331b77898f',
                     app: 'GYMPASS',
                     appGroupName: null,
                     ipAddr: '172.25.0.1',
                     sid: 'na',
                     homePageUrl: 'http://localhost:1527/',
                     statusPageUrl: 'http://localhost:1527/actuator/info',
                     healthCheckUrl: 'http://localhost:1527/actuator/health',
                     secureHealthCheckUrl: null,
                     vipAddress: 'gympass',
                     secureVipAddress: 'gympass',
                     countryId: 1,
                     dataCenterInfo: {
                        '@class':
                           'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                        name: 'MyOwn',
                     },
                     hostName: 'localhost',
                     status: 'UP',
                     overriddenStatus: 'UNKNOWN',
                     leaseInfo: {
                        renewalIntervalInSecs: 30,
                        durationInSecs: 90,
                        registrationTimestamp: 1629721206370,
                        lastRenewalTimestamp: 1629721356381,
                        evictionTimestamp: 0,
                        serviceUpTimestamp: 1629721206370,
                     },
                     isCoordinatingDiscoveryServer: false,
                     metadata: {},
                     lastUpdatedTimestamp: 1629721206370,
                     lastDirtyTimestamp: 1629721206352,
                     actionType: 'ADDED',
                     asgName: null,
                  },
               ],
            },
            {
               name: 'TRAININGS',
               instance: [
                  {
                     instanceId: 'trainings:f57392e84c044f8698f162f6531be33c',
                     app: 'TRAININGS',
                     appGroupName: null,
                     ipAddr: '172.25.0.1',
                     sid: 'na',
                     homePageUrl: 'http://localhost:29078/',
                     statusPageUrl: 'http://localhost:29078/actuator/info',
                     healthCheckUrl: 'http://localhost:29078/actuator/health',
                     secureHealthCheckUrl: null,
                     vipAddress: 'trainings',
                     secureVipAddress: 'trainings',
                     countryId: 1,
                     dataCenterInfo: {
                        '@class':
                           'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                        name: 'MyOwn',
                     },
                     hostName: 'localhost',
                     status: 'UP',
                     overriddenStatus: 'UNKNOWN',
                     leaseInfo: {
                        renewalIntervalInSecs: 30,
                        durationInSecs: 90,
                        registrationTimestamp: 1629721209200,
                        lastRenewalTimestamp: 1629721359224,
                        evictionTimestamp: 0,
                        serviceUpTimestamp: 1629721209200,
                     },
                     isCoordinatingDiscoveryServer: false,
                     metadata: {},
                     lastUpdatedTimestamp: 1629721209200,
                     lastDirtyTimestamp: 1629721209175,
                     actionType: 'ADDED',
                     asgName: null,
                  },
               ],
            },
            {
               name: 'GATEWAY',
               instance: [
                  {
                     instanceId: 'localhost:gateway:8020',
                     app: 'GATEWAY',
                     appGroupName: null,
                     ipAddr: '172.25.0.1',
                     sid: 'na',
                     homePageUrl: 'http://localhost:8020/',
                     statusPageUrl: 'http://localhost:8020/actuator/info',
                     healthCheckUrl: 'http://localhost:8020/actuator/health',
                     secureHealthCheckUrl: null,
                     vipAddress: 'gateway',
                     secureVipAddress: 'gateway',
                     countryId: 1,
                     dataCenterInfo: {
                        '@class':
                           'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                        name: 'MyOwn',
                     },
                     hostName: 'localhost',
                     status: 'UP',
                     overriddenStatus: 'UNKNOWN',
                     leaseInfo: {
                        renewalIntervalInSecs: 30,
                        durationInSecs: 90,
                        registrationTimestamp: 1629721218920,
                        lastRenewalTimestamp: 1629721348622,
                        evictionTimestamp: 0,
                        serviceUpTimestamp: 1629721198748,
                     },
                     isCoordinatingDiscoveryServer: false,
                     metadata: {
                        'management.port': '8020',
                     },
                     lastUpdatedTimestamp: 1629721218920,
                     lastDirtyTimestamp: 1629721198720,
                     actionType: 'ADDED',
                     asgName: null,
                  },
               ],
            },
            {
               name: 'ACCOUNT',
               instance: [
                  {
                     instanceId: 'account:ee440b131ea9378ad49b50fdc44d6996',
                     app: 'ACCOUNT',
                     appGroupName: null,
                     ipAddr: '172.25.0.1',
                     sid: 'na',
                     homePageUrl: 'http://localhost:1460/',
                     statusPageUrl: 'http://localhost:1460/actuator/info',
                     healthCheckUrl: 'http://localhost:1460/actuator/health',
                     secureHealthCheckUrl: null,
                     vipAddress: 'account',
                     secureVipAddress: 'account',
                     countryId: 1,
                     dataCenterInfo: {
                        '@class':
                           'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                        name: 'MyOwn',
                     },
                     hostName: 'localhost',
                     status: 'DOWN',
                     overriddenStatus: 'UNKNOWN',
                     leaseInfo: {
                        renewalIntervalInSecs: 30,
                        durationInSecs: 90,
                        registrationTimestamp: 1629721246504,
                        lastRenewalTimestamp: 1629721366474,
                        evictionTimestamp: 0,
                        serviceUpTimestamp: 1629721246504,
                     },
                     isCoordinatingDiscoveryServer: false,
                     metadata: {},
                     lastUpdatedTimestamp: 1629721246504,
                     lastDirtyTimestamp: 1629721246481,
                     actionType: 'ADDED',
                     asgName: null,
                  },
                  {
                     instanceId: 'account:e384f41a381fcbb4b1814f37de4b7615',
                     app: 'ACCOUNT',
                     appGroupName: null,
                     ipAddr: '172.25.0.1',
                     sid: 'na',
                     homePageUrl: 'http://localhost:1479/',
                     statusPageUrl: 'http://localhost:1479/actuator/info',
                     healthCheckUrl: 'http://localhost:1479/actuator/health',
                     secureHealthCheckUrl: null,
                     vipAddress: 'account',
                     secureVipAddress: 'account',
                     countryId: 1,
                     dataCenterInfo: {
                        '@class':
                           'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                        name: 'MyOwn',
                     },
                     hostName: 'localhost',
                     status: 'UP',
                     overriddenStatus: 'UNKNOWN',
                     leaseInfo: {
                        renewalIntervalInSecs: 30,
                        durationInSecs: 90,
                        registrationTimestamp: 1629721218920,
                        lastRenewalTimestamp: 1629721347457,
                        evictionTimestamp: 0,
                        serviceUpTimestamp: 1629721197457,
                     },
                     isCoordinatingDiscoveryServer: false,
                     metadata: {},
                     lastUpdatedTimestamp: 1629721218920,
                     lastDirtyTimestamp: 1629721197436,
                     actionType: 'ADDED',
                     asgName: null,
                  },
               ],
            },
            {
               name: 'TASK',
               instance: [
                  {
                     instanceId: 'task:e9e4db787c76058736f056f5dc39c04c',
                     app: 'TASK',
                     appGroupName: null,
                     ipAddr: '172.25.0.1',
                     sid: 'na',
                     homePageUrl: 'http://localhost:18004/',
                     statusPageUrl: 'http://localhost:18004/actuator/info',
                     healthCheckUrl: 'http://localhost:18004/actuator/health',
                     secureHealthCheckUrl: null,
                     vipAddress: 'task',
                     secureVipAddress: 'task',
                     countryId: 1,
                     dataCenterInfo: {
                        '@class':
                           'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                        name: 'MyOwn',
                     },
                     hostName: 'localhost',
                     status: 'UP',
                     overriddenStatus: 'UNKNOWN',
                     leaseInfo: {
                        renewalIntervalInSecs: 30,
                        durationInSecs: 90,
                        registrationTimestamp: 1629721212140,
                        lastRenewalTimestamp: 1629721362146,
                        evictionTimestamp: 0,
                        serviceUpTimestamp: 1629721212140,
                     },
                     isCoordinatingDiscoveryServer: false,
                     metadata: {},
                     lastUpdatedTimestamp: 1629721212140,
                     lastDirtyTimestamp: 1629721212114,
                     actionType: 'ADDED',
                     asgName: null,
                  },
               ],
            },
            {
               name: 'AUTH',
               instance: [
                  {
                     instanceId: 'auth:f3a2bd63c9a969c01e4c2423f21fa44a',
                     app: 'AUTH',
                     appGroupName: null,
                     ipAddr: '172.25.0.1',
                     sid: 'na',
                     homePageUrl: 'http://localhost:22804/',
                     statusPageUrl: 'http://localhost:22804/actuator/info',
                     healthCheckUrl: 'http://localhost:22804/actuator/health',
                     secureHealthCheckUrl: null,
                     vipAddress: 'auth',
                     secureVipAddress: 'auth',
                     countryId: 1,
                     dataCenterInfo: {
                        '@class':
                           'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                        name: 'MyOwn',
                     },
                     hostName: 'localhost',
                     status: 'UP',
                     overriddenStatus: 'UNKNOWN',
                     leaseInfo: {
                        renewalIntervalInSecs: 30,
                        durationInSecs: 90,
                        registrationTimestamp: 1629721202026,
                        lastRenewalTimestamp: 1629721352045,
                        evictionTimestamp: 0,
                        serviceUpTimestamp: 1629721202026,
                     },
                     isCoordinatingDiscoveryServer: false,
                     metadata: {},
                     lastUpdatedTimestamp: 1629721202026,
                     lastDirtyTimestamp: 1629721202002,
                     actionType: 'ADDED',
                     asgName: null,
                  },
               ],
            },
            {
               name: 'CONFIG-SERVER',
               instance: [
                  {
                     instanceId: 'localhost:config-server:8030',
                     app: 'CONFIG-SERVER',
                     appGroupName: null,
                     ipAddr: '172.25.0.1',
                     sid: 'na',
                     homePageUrl: 'http://localhost:8030/',
                     statusPageUrl: 'http://localhost:8030/actuator/info',
                     healthCheckUrl: 'http://localhost:8030/actuator/health',
                     secureHealthCheckUrl: null,
                     vipAddress: 'config-server',
                     secureVipAddress: 'config-server',
                     countryId: 1,
                     dataCenterInfo: {
                        '@class':
                           'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                        name: 'MyOwn',
                     },
                     hostName: 'localhost',
                     status: 'UP',
                     overriddenStatus: 'UNKNOWN',
                     leaseInfo: {
                        renewalIntervalInSecs: 30,
                        durationInSecs: 90,
                        registrationTimestamp: 1629721203418,
                        lastRenewalTimestamp: 1629721353445,
                        evictionTimestamp: 0,
                        serviceUpTimestamp: 1629721203418,
                     },
                     isCoordinatingDiscoveryServer: false,
                     metadata: {
                        'management.port': '8030',
                     },
                     lastUpdatedTimestamp: 1629721203418,
                     lastDirtyTimestamp: 1629721203396,
                     actionType: 'ADDED',
                     asgName: null,
                  },
               ],
            },
            {
               name: 'DISCOVERY',
               instance: [
                  {
                     instanceId: 'localhost:discovery:8010',
                     app: 'DISCOVERY',
                     appGroupName: null,
                     ipAddr: '172.25.0.1',
                     sid: 'na',
                     homePageUrl: 'http://localhost:8010/',
                     statusPageUrl: 'http://localhost:8010/actuator/info',
                     healthCheckUrl: 'http://localhost:8010/actuator/health',
                     secureHealthCheckUrl: null,
                     vipAddress: 'discovery',
                     secureVipAddress: 'discovery',
                     countryId: 1,
                     dataCenterInfo: {
                        '@class':
                           'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                        name: 'MyOwn',
                     },
                     hostName: 'localhost',
                     status: 'UP',
                     overriddenStatus: 'UNKNOWN',
                     leaseInfo: {
                        renewalIntervalInSecs: 30,
                        durationInSecs: 90,
                        registrationTimestamp: 1629721218920,
                        lastRenewalTimestamp: 1629721360897,
                        evictionTimestamp: 0,
                        serviceUpTimestamp: 1629721189568,
                     },
                     isCoordinatingDiscoveryServer: true,
                     metadata: {
                        'management.port': '8010',
                     },
                     lastUpdatedTimestamp: 1629721218920,
                     lastDirtyTimestamp: 1629721188895,
                     actionType: 'ADDED',
                     asgName: null,
                  },
               ],
            },
         ]),
      ),
   ),
];
