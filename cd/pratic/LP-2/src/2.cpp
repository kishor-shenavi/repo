#include <iostream>
#include <vector>
#include <queue>
#include <cmath>
#include <algorithm>

using namespace std;

struct Node
{
    int x, y;
    int g, h;

    bool operator<(const Node& other ) const{
        return (g+h)> (other.g+other.h);
    }
};

class AStar
{
public:
    int n, m;

    vector<vector<int>> grid;

    pair<int, int> start;
    pair<int, int> goal;

    vector<vector<bool>> visited;

    vector<vector<pair<int, int>>> parent;

    // Directions: Up, Down, Left, Right
    int dx[4] = {-1, 1, 0, 0};
    int dy[4] = {0, 0, -1, 1};


    // Input Function
    void input()
    {
        cout << "Enter rows and columns: ";
        cin >> n >> m;

        grid.resize(n, vector<int>(m));

        cout << "Enter grid (0 = path, 1 = obstacle):\n";

        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < m; j++)
            {
                cin >> grid[i][j];
            }
        }

        int sx, sy, gx, gy;

        cout << "Enter start coordinates: ";
        cin >> sx >> sy;

        cout << "Enter goal coordinates: ";
        cin >> gx >> gy;

        start = {sx, sy};
        goal = {gx, gy};

        visited.resize(n, vector<bool>(m, false));

        parent.resize(n, vector<pair<int, int>>(m, {-1, -1}));
    }

    // Manhattan Distance Heuristic
    int heuristic(int x1, int y1, int x2, int y2)
    {
        return abs(x1 - x2) + abs(y1 - y2);
    }

    // Check Valid Cell
    bool isValid(int x, int y)
    {
        return (x >= 0 && x < n &&  y >= 0 && y < m);
    }

    // Print Final Grid
    void printGrid(vector<pair<int, int>> &path)
    {
        vector<vector<char>> view(n,vector<char>(m, 'X'));

        for (auto &p : path){
            if (p != start && p != goal)
            {
                view[p.first][p.second] = '*';
            }
        }

        view[start.first][start.second] = 'S';
        view[goal.first][goal.second] = 'G';

        cout << "\nGrid with Path:\n\n";

        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < m; j++)
            {
                cout << view[i][j] << " ";
            }

            cout << endl;
        }
    }

    // A* Search Algorithm
    void solve()
    {
        priority_queue<Node> pq;

        int sx = start.first;
        int sy = start.second;

        int gx = goal.first;
        int gy = goal.second;

        // Push Start Node
        pq.push({sx,sy,0,heuristic(sx, sy, gx, gy)});

        while (!pq.empty())
        {
            Node cur = pq.top();
            pq.pop();

            int x = cur.x;
            int y = cur.y;

            // Skip Visited Node
            if (visited[x][y])
            {
                continue;
            }

            visited[x][y] = true;

            // Goal Reached
            if (x == gx && y == gy)
            {
                vector<pair<int, int>> path;

                while (!(x == sx && y == sy))
                {
                    path.push_back({x, y});

                    pair<int, int> p = parent[x][y];

                    x = p.first;
                    y = p.second;
                }

                path.push_back({sx, sy});

                reverse(path.begin(), path.end());

                cout << "\nPath Found:\n";

                for (auto p : path)
                {
                    cout << "("<< p.first<< ", "<< p.second << ") ";
                }

                cout << endl;

                printGrid(path);

                return;
            }

            // Explore Neighbors
            for (int i = 0; i < 4; i++)
            {
                int nx = x + dx[i];
                int ny = y + dy[i];

                if (isValid(nx, ny) &&
                    !visited[nx][ny] &&
                    grid[nx][ny] == 0)
                {
                    int newG = cur.g + 1;

                    int newH = heuristic(nx,ny, gx,gy);

                    pq.push({nx, ny, newG, newH});

                    parent[nx][ny] = {x, y};
                }
            }
        }

        cout << "\nNo Path Found!\n";
    }
};

int main()
{
    AStar game;

    game.input();

    game.solve();

    return 0;
}