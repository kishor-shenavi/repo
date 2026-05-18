#include <iostream>
#include <vector>
#include <climits>

using namespace std;

int minDistance(vector<int>& dist, vector<bool>& visited, int V) {

    int min = INT_MAX;
    int min_index;

    for (int v = 0; v < V; v++) {

        if (visited[v] == false && dist[v] <= min) {

            min = dist[v];
            min_index = v;
        }
    }

    return min_index;
}

void shortestPath(vector<vector<int>>& graph, int source, int V) {

    vector<int> dist(V, INT_MAX);
    vector<bool> visited(V, false);

    dist[source] = 0;

    for (int count = 0; count < V - 1; count++) {

        int u = minDistance(dist, visited, V);

        visited[u] = true;
        
        for (int v = 0; v < V; v++) {

            if (!visited[v] &&
                graph[u][v] &&
                dist[u] != INT_MAX &&
                dist[u] + graph[u][v] < dist[v]) {

                dist[v] = dist[u] + graph[u][v];
            }
        }
    }

    cout << "Vertex\tDistance from Source\n";

    for (int i = 0; i < V; i++) {
        cout << i << "\t" << dist[i] << endl;
    }
}

int main() {

    int V = 9;

    vector<vector<int>> graph = {
        {0,4,0,0,0,0,0,8,0},
        {4,0,8,0,0,0,0,11,0},
        {0,8,0,7,0,4,0,0,2},
        {0,0,7,0,9,14,0,0,0},
        {0,0,0,9,0,10,0,0,0},
        {0,0,4,14,10,0,2,0,0},
        {0,0,0,0,0,2,0,1,6},
        {8,11,0,0,0,0,1,0,7},
        {0,0,2,0,0,0,6,7,0}
    };

    shortestPath(graph, 0, V);

    return 0;
}