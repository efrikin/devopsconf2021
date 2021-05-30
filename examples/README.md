# `Test examples from the presentation`

## `Overview`

This describes how to replay the performed tests from the presentation

## `General`

### `Problems`

#### `calico`

There is no support of arm64 for CNI calico in version `Kubespray v2.15.0`.

To fix this problem it is necessary to override the following variables in `inventory/sample/group_vars/all/all.yml`:

* `calico_node_image_tag: {{ calico_version }}-arm64`
* `calico_policy_image_tag: {{ calico_policy_version }}-arm64`
* `calico_cni_image_tag: {{ calico_cni_version }}-arm64`
* `calico_typha_image_tag: {{ calico_typha_version }}-arm64`

It was fixed in version `Kubespray v2.15.1`

#### `nodeSelectors with services`

`calico, calico-node-controllers, coredns, dns-autoscaler, nodelocaldns and kube-proxy` in all versions of `Kubespray` don't support `nodeSelector`

`kube-proxy` by design doesn't support `nodeSelector`. It depends on `kubeadm` in which there are no flags to deploy on other labels. It can be fixed only manually.

[This PR partially solves problems with cluster deploy on others label ](https://github.com/kubernetes-sigs/kubespray/pull/7613)

#### `nodeSelector for prometheus-stack`

`prometheus-stack` doesn't support `nodeSelector` for `node-exporter`. It can be fixed only manually.

#### `Example of adding of nodeSelector`

```yaml
...
nodeSelector:
  role: cluster
...
```

### `Software`

* [kubespray v2.15.0](https://github.com/kubernetes-sigs/kubespray/tree/v2.15.0)
* [kubemakrk v1.19](https://github.com/kubernetes/kubernetes/tree/release-1.19/test/kubemark)
* [clusterloader2 v1.19](https://github.com/kubernetes/perf-tests/tree/release-1.19)

### `Build`

#### `kubemark`

```shell
docker build --rm -t kubemark examples/images/kubemark
```

#### `clusterloader2`

```shell
docker build --rm -t kubemark examples/images/clusterloader2
```

## `Deploy of Kubernetes cluster`

### `Configuration of inventory`

Add vars into `inventory.ini` which overrides `node_labels`.

Example of simple `inventory.ini`

```ini
[all]
node1
node2
node3

[kube-master]
node1

[etcd]
node1

[kube-node]
node2

[monitoring]
node3

[calico-rr]

[k8s-cluster:children]
k8s-master
kube-node
calico-rr
monitoring

[kube-master:vars]
node_labels={'role': 'cluster'}

[kube-node:vars]
node_labels={'node': 'kubemark', 'role': 'cluster'}

[monitoring:vars]
node_labels={'node': 'monitoring', 'role': 'cluster'}
```

### `Configuration of group_vars`

Change to `inventory/sample/group_vars/all/all.yml`

```yaml
## Please uncomment, if container engine has already been installed
# deploy_container_engine: false

download_run_once: true

kube_proxy_metrics_bind_address: 0.0.0.0:10249

calico_node_cpu_limit: 1
calico_node_memory_limit: 2500M
```

Change to `inventory/sample/group_vars/k8s-cluster/k8s-cluster.yml`

```yaml

## Please uncomment, if you want to scale cluster more than 15k nodes
# kube_service_addresses: 10.232.0.0/14
# kube_pods_subnet: 10.236.0.0/14

retry_stagger: 50

```

### `After deploy`

#### `Add nodeSelector`

For services need add `nodeSelector`

* calico
* calico-node-controllers
* coredns
* dns-autoscaler
* kube-proxy
* nodelocaldns

### `Monitoring`

Configure follow services in `prometheus-stack`:

* Add `nodeSelector` for:
  - `prometheusOperator`
  - `alertManager`
  - `prometheus`
* Change `kubeEtcd.endpoints` and `serviceMonitor`
* requests/limits for services

Perform on any master node:

```shell
kubectl -n default create secret generic etcd-client-cert --from-file=/etc/ssl/etcd/ssl/ca.pem --from-file=/etc/ssl/etcd/ssl/admin-node1.pem --from-file=/etc/ssl/etcd/ssl/admin-node1-key.pem
```

After deploy add `nodeSelector` in `daemonset` `node-exporter`.

### `Kubemark`

#### `Before deploy`

Create namespace, configmap and secret:

```shell
kubectl create ns kubemark
kubectl create configmap node-configmap -n kubemark --from-literal=content.type="test-cluster"
kubectl create secret generic kubeconfig --type=Opaque --namespace=kubemark --from-file=kubelet.kubeconfig=${HOME}/.kube/config --from-file=kubeproxy.kubeconfig=${HOME}/.kube/config
```

Add node affinity for kubemark:

```yaml
...
    spec:
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
              - matchExpressions:
                  - key: node
                    operator: In
                    values:
                      - kubemark
...
```

#### `Deploy`

```shell
kubectl -n kubemark apply -f hollow-node-template.yml
```

#### `Scale`

```shell
kubectl -n kubemark scale --replicas=XXXX rc/hollow-node
```

### `clusterloader2 runs node-throughput test`

Add node affinity to `rc.yaml`

```yaml
    spec:
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
              - matchExpressions:
                  - key: hollow
                    operator: In
                    values:
                      - "true"
```

Perform the following command from directory `clusterloader2` with `Dockerfile`:

```shell
docker run --rm --network host \
    -v ${HOME}/.kube/:${HOME}/.kube:ro \
    -v $(pwd)/testing:${HOME}/testing:ro \
    -ti clusterloader2 \
    --kubeconfig=${HOME}/.kube/config \
    --testconfig=${HOME}/testing/config.yaml \
    --provider=kubemark
```

## Documentations

* [kubemark docs](https://github.com/kubernetes/community/tree/master/contributors/devel/sig-scalability)
* [kubemark resources example](https://github.com/kubernetes/kubernetes/tree/master/test/kubemark)
* [clusterloader2](https://github.com/kubernetes/perf-tests/tree/master/clusterloader2)
* [clusterloader2 tests example](https://github.com/kubernetes/perf-tests/tree/master/clusterloader2/testing)
* [openshift clusterloader](https://docs.openshift.com/container-platform/4.2/scalability_and_performance/using-cluster-loader.html)
* [bingerambo](http://bingerambo.com/posts/2020/12/k8s%E9%9B%86%E7%BE%A4%E6%80%A7%E8%83%BD%E6%B5%8B%E8%AF%95-clusterloader/)
* [Scaling k8s to 7500 nodes](https://openai.com/blog/scaling-kubernetes-to-7500-nodes/)
* [alibaba scalability testing](https://www.alibabacloud.com/blog/how-does-alibaba-ensure-the-performance-of-system-components-in-a-10000-node-kubernetes-cluster_595469)
* [ebay scalability testing](https://tech.ebayinc.com/engineering/scalability-tuning-on-tess-io-cluster/)
