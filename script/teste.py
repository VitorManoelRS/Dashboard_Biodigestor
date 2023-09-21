def solve(n):
    sum = 0
    for j in range(n):
        if j<1:
            j=1
        x = n%j
        if x==0:
            sum = sum + j
        
    if (sum == n):
        print("YES")
    else:
        print("NO")
            

T = int(input())

for i in range(T):
    N = int(input())
    solve(N)