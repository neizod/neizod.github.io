---
title: Code Jam 2021 รอบคัดเลือก
tags:
  - Competitive Programming
  - Interactive Problem
  - Google Code Jam
  - Python
  - R
  - Haskell
  - C++
  - Ruby
date: 2021-03-28 02:56:18 +0700
---

เขียจอธิบาย แกะโค้ดกันไปเองก่อนละกันนะ (เสียจัยที่ชวด 101 คะแนน)

## Reversort

``` c++
#include <iostream>
using namespace std;

int xs[100];

int count_reversort(int n) {
    int count = 0;
    for (int i=0; i<n-1; i++) {
        int j = i;
        while (i+1 != xs[j]) {
            j += 1;
        }
        int size = (1+j-i);
        count += size;
        for (int k=0; k<size/2; k++) {
            swap(xs[i+k], xs[j-k]);
        }
    }
    return count;
}

int main(void) {
    int tests;
    cin >> tests;
    for (int t=0; t<tests; t++) {
        int n;
        cin >> n;
        for (int i=0; i<n; i++) {
            cin >> xs[i];
        }
        int answer = count_reversort(n);
        printf("Case #%i: %i\n", t+1, answer);
    }
    return 0;
}
```


## Moons and Umbrellas

``` ruby
gets.to_i.times do |test|
  cj, jc, pattern = gets.split
  ans = 0
  pattern.delete("?").split("").each_cons(2) do |a,b|
    ans += cj.to_i if a+b == "CJ"
    ans += jc.to_i if a+b == "JC"
  end
  puts "Case ##{test+1}: #{ans}"
end
```


## Reversort Engineering

``` haskell
import Text.Printf

triangularNumber n = n*(n+1) `div` 2

findOrder 1 c = [0]
findOrder n c = k : findOrder (n-1) (c-k)
    where k = min n (c-(n-2))

getSample []     ys = ys
getSample (x:xs) ys = getSample xs $ (reverse (take x zs)) ++ (drop x zs)
    where zs = (1 + length xs) : ys

findReversort n c = if c < n-1 || c > (triangularNumber n)-1
    then Nothing
    else Just $ getSample (reverse (findOrder n c)) []

test t = do
    [n,c] <- getInts
    let answer = case findReversort n c of
                      Nothing -> "IMPOSSIBLE"
                      Just xs -> unwords (map show xs)
    printf "Case #%d: %s\n" t answer

getInts = do
    xs <- getLine
    return [read x | x <- words xs]

main = do
    [loop] <- getInts
    sequence_ [test t | t <- [1..loop]]
```


## Median Sort

``` python
def ask(a, b, c):
    print(a, b, c)
    return int(input())

def answer(xs):
    print(*xs)
    return int(input()) == 1

def find_lo_hi(x, left=None, right=None):
    if left is None or right is None:
        return -1, x-1
    q, r = divmod(right-left, 3)
    dl, dr = q+bool(r), q
    if right-left == 2 and right == x-1:
        dl, dr = dr, dl
    return left+dl, right-dr

def interact_median_sort(n):
    xs = [1, 2, 3]
    mid = ask(*xs)
    xs.remove(mid)
    xs[1:1] = [mid]
    for x in range(4, n+1):
        left, right = find_lo_hi(x)
        while right-left > 1:
            lo, hi = find_lo_hi(x, left, right)
            mid = ask(xs[lo], xs[hi], x)
            if mid == xs[lo]:
                right = lo
            elif mid == xs[hi]:
                left = hi
            else:
                left = lo
                right = hi
        xs[right:right] = [x]
    return answer(xs)

if __name__ == '__main__':
    cases, n, _ = [int(x) for x in input().split()]
    for case in range(cases):
        interact_median_sort(n)
```


## Cheating Detection

``` R
neighbor_median <- function(xs, n=5) {
    padxs <- c(tail(xs, n%/%2), xs, head(xs, (n-1)%/%2))
    apply(embed(padxs, n), 1, median)
}

partition_sd <- function(xs, ngroup=10) {
    apply(xs, 2, function(score) sd(colSums(matrix(score, ncol=ngroup))))
}

find_cheater <- function(scores) {
    colnames(scores) <- 1:100
    scores <- scores[order(rowSums(scores)),order(colSums(scores))]
    sd_scores <- partition_sd(scores)
    md_scores <- neighbor_median(sd_scores)
    suspect <- abs(sd_scores - md_scores)
    colnames(scores)[which(suspect == max(suspect))]
}

if (!interactive()) {
    f <- file("stdin", "r")
    cases <- as.integer(readLines(f, n=1))
    percent <- as.integer(readLines(f, n=1))
    for (case in 1:cases) {
        raw <- readLines(f, n=100)
        input <- na.omit(as.integer(unlist(strsplit(raw, ""))))
        answer <- find_cheater(matrix(input, ncol=100))
        cat(paste0("Case #", case, ": ", answer, "\n"))
    }
}
```
