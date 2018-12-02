import {Cluster, Namespace, Pod, Item} from "./k8s/contextObjectTypes";
import Context from "./context/contextStore";
import * as k8s from './k8s/k8sClient'
import * as jp from 'jsonpath'


export function setupRealContext(context: Context) : Context {
  const c1 = new Cluster("eastus2/dev/af1")
  const c2 = new Cluster("eastus2/dev/af2")
  context.addCluster(c1)
  context.addCluster(c2)

  const ns11 = new Namespace("istio-system", c1)
  const ns12 = new Namespace("kube-system", c1)
  const ns13 = new Namespace("fortio", c1)
  context.addNamespace(ns11)
  context.addNamespace(ns12)
  context.addNamespace(ns13)

  const ns21 = new Namespace("istio-system", c2)
  const ns22 = new Namespace("kube-system", c2)
  context.addNamespace(ns21)
  context.addNamespace(ns22)

  const pod1101 = new Pod("istio-ingressgateway-f9c84c4c-xg9fv", ns11)
  const pod1102 = new Pod("istio-pilot-795bb47bdd-tc8ck", ns11)
  const pod1103 = new Pod("istio-citadel-7b4c4cf8f9-g5hzp", ns11)
  const pod1104 = new Pod("istio-policy-6c6669dcb8-57rfc", ns11)
  const pod1105 = new Pod("istio-policy-6c6669dcb8-58scb", ns11)
  const pod1106 = new Pod("istio-egressgateway-5c6655946d-cwd4w", ns11)
  
  const pod1201 = new Pod("kube-apiserver-cpeasf4e4000000", ns12)
  const pod1202 = new Pod("kube-controller-manager-cpeasf4e4000000", ns12)
  const pod1203 = new Pod("kube-controller-manager-cpeasf4e4000001", ns12)
  const pod1204 = new Pod("kube-controller-manager-cpeasf4e4000002", ns12)

  const pod1301 = new Pod("fortio1-658d599d47-57l87", ns13)
  const pod1302 = new Pod("fortio2-65cbd67948-5grn9", ns13)
  const pod1303 = new Pod("testcurl-7fbcdd4c57-gnd75", ns13)
  
  context.addPod(pod1101)
  context.addPod(pod1102)
  context.addPod(pod1103)
  context.addPod(pod1104)
  context.addPod(pod1105)
  context.addPod(pod1201)
  context.addPod(pod1202)
  context.addPod(pod1203)
  context.addPod(pod1204)
  context.addPod(pod1301)
  context.addPod(pod1302)
  context.addPod(pod1303)

  const pod2101 = new Pod("istio-ingressgateway-78b69894d6-t4c84", ns21)
  const pod2102 = new Pod("istio-pilot-6f4df78944-6dhmm", ns21)
  const pod2103 = new Pod("istio-citadel-56b98b8d8b-2l7j4", ns21)
  const pod2104 = new Pod("istio-policy-96f8fbbc4-56rdb", ns21)
  const pod2105 = new Pod("istio-egressgateway-66cb87fb49-9mkwk", ns21)

  const pod2201 = new Pod("kube-apiserver-cpeas01fd000000", ns22)
  const pod2202 = new Pod("kube-controller-manager-cpeas01fd000000", ns22)
  const pod2203 = new Pod("kube-controller-manager-cpeas01fd000001", ns22)
  const pod2204 = new Pod("kube-controller-manager-cpeas01fd000002", ns22)

  context.addPod(pod2101)
  context.addPod(pod2102)
  context.addPod(pod2103)
  context.addPod(pod2104)
  context.addPod(pod2105)
  context.addPod(pod2201)
  context.addPod(pod2202)
  context.addPod(pod2203)
  context.addPod(pod2204)

  return context

}

export function createTestData(context: Context) : Context {
  const c1 = new Cluster("cluster-1")
  const c2 = new Cluster("cluster-2")
  context.addCluster(c1)
  context.addCluster(c2)

  const ns11 = new Namespace("some-junk-namespace-11", c1)
  const ns12 = new Namespace("some-junk-namespace-12", c1)
  const ns13 = new Namespace("some-junk-namespace-13", c1)
  const ns14 = new Namespace("some-junk-namespace-14", c1)
  const ns15 = new Namespace("some-junk-namespace-15", c1)
  context.addNamespace(ns11)
  context.addNamespace(ns12)
  context.addNamespace(ns13)
  context.addNamespace(ns14)
  context.addNamespace(ns15)

  const ns21 = new Namespace("some-junk-namespace-21", c2)
  const ns22 = new Namespace("some-junk-namespace-22", c2)
  const ns23 = new Namespace("some-junk-namespace-23", c2)
  const ns24 = new Namespace("some-junk-namespace-24", c2)
  const ns25 = new Namespace("some-junk-namespace-25", c2)
  context.addNamespace(ns21)
  context.addNamespace(ns22)
  context.addNamespace(ns23)
  context.addNamespace(ns24)
  context.addNamespace(ns25)

  const pod1101 = new Pod("abcdefgh-abcdefgh-abcdefgh-some-junk-pod-1101", ns11)
  const pod1102 = new Pod("abcdefgh-abcdefgh-some-junk-pod-1102", ns11)
  const pod1103 = new Pod("abcdefgh-some-junk-pod-1103", ns11)
  const pod1104 = new Pod("some-junk-pod-1104", ns11)
  const pod1105 = new Pod("some-junk-pod-1105", ns11)
  const pod1201 = new Pod("some-junk-pod-1201", ns12)
  const pod1202 = new Pod("some-junk-pod-1202", ns12)
  const pod1203 = new Pod("some-junk-pod-1203", ns12)
  const pod1301 = new Pod("some-junk-pod-1301", ns13)
  const pod1302 = new Pod("some-junk-pod-1302", ns13)
  const pod1401 = new Pod("some-junk-pod-1401", ns14)
  context.addPod(pod1101)
  context.addPod(pod1102)
  context.addPod(pod1103)
  context.addPod(pod1104)
  context.addPod(pod1105)
  context.addPod(pod1201)
  context.addPod(pod1202)
  context.addPod(pod1203)
  context.addPod(pod1301)
  context.addPod(pod1302)
  context.addPod(pod1401)

  const pod2101 = new Pod("abcdefgh-abcdefgh-some-junk-pod-2101", ns21)
  const pod2102 = new Pod("abcdefgh-some-junk-pod-2102", ns21)
  const pod2103 = new Pod("some-junk-pod-2103", ns21)
  const pod2104 = new Pod("some-junk-pod-2104", ns21)
  const pod2105 = new Pod("some-junk-pod-2105", ns21)
  const pod2201 = new Pod("some-junk-pod-2201", ns22)
  const pod2202 = new Pod("some-junk-pod-2202", ns22)
  const pod2203 = new Pod("some-junk-pod-2203", ns22)
  const pod2301 = new Pod("some-junk-pod-2301", ns23)
  const pod2302 = new Pod("some-junk-pod-2302", ns23)
  const pod2401 = new Pod("some-junk-pod-2401", ns24)
  context.addPod(pod2101)
  context.addPod(pod2102)
  context.addPod(pod2103)
  context.addPod(pod2104)
  context.addPod(pod2105)
  context.addPod(pod2201)
  context.addPod(pod2202)
  context.addPod(pod2203)
  context.addPod(pod2301)
  context.addPod(pod2302)
  context.addPod(pod2401)

  return context
}



export function testJsonPath(context: Context) {
  const cluster = new Cluster("eastus2/dev/af1")
  context.addCluster(cluster)

  const namespace = new Namespace("istio-system", cluster)
  context.addNamespace(namespace)

  k8s.getPodsForNamespace(namespace)
  .then(pods => {
    const pod = pods.filter(pod => pod.metadata.name.includes("pilot"))[0]
    console.log(pod)
    let result = jp.apply(pod, "$.status.containerStatuses[*]",
    value => {
      console.log("getPodStatus " + JSON.stringify(value))
      return {name: value.name, state: value.state}
    })
    console.log("result = " + JSON.stringify(result))
    result = jp.query(result, "$[*].value")
    console.log("result = " + JSON.stringify(result))
  })

}