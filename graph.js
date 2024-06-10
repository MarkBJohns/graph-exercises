class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.forEach(vertex => this.addVertex(vertex));
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.forEach(node => {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex);
      }
    });
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const seen = new Set();
    const allNodes = [];
    
    const dfs = (vertex) => {
      if (!vertex || seen.has(vertex)) return
      
      seen.add(vertex);
      allNodes.push(vertex.value);
      vertex.adjacent.forEach(neighbor => dfs(neighbor));
    }
    
    dfs(start);
    return allNodes;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const queue = [start];
    const seen = new Set(queue);
    const allNodes = [];
    
    while (queue.length) {
      const currentNode = queue.shift();
      allNodes.push(currentNode.value);
      
      currentNode.adjacent.forEach(neighbor => {
        if (!seen.has(neighbor)) {
          seen.add(neighbor);
          queue.push(neighbor);
        }
      });
    }
    
    return allNodes;
  }
}

module.exports = {Graph, Node}