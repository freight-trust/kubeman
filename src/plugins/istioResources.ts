import {ActionGroupSpec, ActionContextType, ActionOutputStyle, ActionOutput, ActionContextOrder} from '../actions/actionSpec'
import IstioFunctions from '../k8s/istioFunctions';
import ActionContext from '../actions/actionContext';

export async function listResources(type: string, getResources: (k8sClient) => Promise<any[]>, 
                                    actionContext: ActionContext, onStreamOutput, onOutput, showOutputLoading) {
  onOutput([[type+" List", ""]], ActionOutputStyle.Table)
  const clusters = actionContext.getClusters()
  showOutputLoading(true)

  for(const cluster of clusters) {
    const output: ActionOutput = []
    if(cluster.hasIstio) {
      const resources = (await getResources(cluster.k8sClient)).map(r => {
        return {
          name: r.name,
          namespace: r.namespace,
          creationTimestamp: r.creationTimestamp,
          yaml: r.yaml
        }
      })
      output.push([">"+type+" @ Cluster: " + cluster.name + " (" + resources.length + " found)", ""])
      resources.length === 0 && output.push(["", "No resource found"])
      resources.forEach(resource => {
        let title = resource.name
        title && (title += "."+(resource.namespace))
        output.push([">>" + title, ""])
        Object.keys(resource).forEach(key => resource[key] && output.push([key, resource[key]]))
      })
    } else {
      output.push([">"+type+" @ Cluster: " + cluster.name, ""])
      output.push(["", "Istio not installed"])
    }
    onStreamOutput(output)
  }
  showOutputLoading(false)
}

const plugin : ActionGroupSpec = {
  context: ActionContextType.Istio,
  title: "Resources",
  order: ActionContextOrder.Resources,
  actions: [
    {
      name: "List Gateways",
      order: 11,
      act(actionContext) {
        listResources("Gateways", IstioFunctions.listAllGateways, actionContext, this.onStreamOutput, this.onOutput, this.showOutputLoading)
      }
    },
    {
      name: "List VirtualServices",
      order: 12,
      act(actionContext) {
        listResources("VirtualServices", IstioFunctions.listAllVirtualServices, actionContext, this.onStreamOutput, this.onOutput, this.showOutputLoading)
      }
    },
    {
      name: "List ServiceEntries",
      order: 13,
      act(actionContext) {
        listResources("ServiceEntries", IstioFunctions.listAllServiceEntries, actionContext, this.onStreamOutput, this.onOutput, this.showOutputLoading)
      }
    },
    {
      name: "List Sidecar Resources",
      order: 14,
      act(actionContext) {
        listResources("Sidecars", IstioFunctions.listAllSidecarResources, actionContext, this.onStreamOutput, this.onOutput, this.showOutputLoading)
      }
    },
    {
      name: "List DestinationRules",
      order: 15,
      act(actionContext) {
        listResources("DestinationRules", IstioFunctions.listAllDestinationRules, actionContext, this.onStreamOutput, this.onOutput, this.showOutputLoading)
      }
    },
    {
      name: "List Policies",
      order: 16,
      act(actionContext) {
        listResources("Policies", IstioFunctions.listAllPolicies, actionContext, this.onStreamOutput, this.onOutput, this.showOutputLoading)
      }
    },
    {
      name: "List MeshPolicies",
      order: 17,
      act(actionContext) {
        listResources("MeshPolicies", IstioFunctions.listAllMeshPolicies, actionContext, this.onStreamOutput, this.onOutput, this.showOutputLoading)
      }
    },
    {
      name: "List Rules",
      order: 18,
      act(actionContext) {
        listResources("Rules", IstioFunctions.listAllRules, actionContext, this.onStreamOutput, this.onOutput, this.showOutputLoading)
      }
    },
  ]
}

export default plugin