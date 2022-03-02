/**
 * 内联地址
 */
const innerApi = {
  NacosPath: "http://49.233.56.155:8848/nacos/",
  RabbitMQPAth: "http://49.233.56.155:15672/",
};

/**
 * 外部链接地址
 */
const outApi = {
  NacosPath: "https://nacos.io/zh-cn/",
  RabbitMQPath: "https://rabbitmq.com/",
};

/**
 * @param url 跳转链接
 */
const toPath = (url: string) => {
  window.open(url);
};

/**
 * 跳转到内联 Nacos 控制台
 */
export const toNacos = () => {
  toPath(innerApi.NacosPath);
};

/**
 * 跳转到 Nacos 官网
 */
export const outNacos = () => {
  toPath(outApi.NacosPath);
};

/**
 * 跳转到内联 RabbitMQ 控制台
 */
export const toRabbit = () => {
  toPath(innerApi.RabbitMQPAth);
};

/**
 * 跳转到 RabbitMQ 官网
 */
export const outRabbit = () => {
  toPath(outApi.RabbitMQPath);
};
