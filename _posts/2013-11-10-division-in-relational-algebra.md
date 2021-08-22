---
title: ทำความเข้าใจการหารบนฐานข้อมูล
tags:
  - Programming
  - Database
  - Relational Algebra
  - SQL
  - Python
  - One-Liner
date: 2013-11-10 12:06:00 +0700
---

DIVISION ใน [relational algebra][] หรือเรียกง่ายๆ ว่าการหารบนฐานข้อมูลนั้น อธิบายคร่าวๆ คือการเอาตารางมา inner join กันแล้วนับว่าแต่ละ key ที่สนใจของตารางตัวตั้ง มีจำนวน row เท่ากับตารางตัวหารหรือไม่ ถ้าครบก็ตัด column ที่ปรากฏในตารางตัวหารทิ้งแล้วยุบรวม row ซ้ำด้วย key นั้นๆ

เช่น เรามีตาราง `students` ซึ่งเก็บข้อมูลนักเรียน 3 คนที่ลงเรียนวิชาต่างๆ พร้อมผลการเรียน ดังนี้

| name | subj | grade |
|------|------|-------|
| bar  | code | A     |
| foo  | code | C+    |
| foo  | trek | A     |
| qux  | code | B+    |
| qux  | math | A     |
| qux  | trek | A     |

ส่วนตาราง `colleges` อีกตารางหนึ่งนั้น เก็บข้อมูลของ 2 วิทยาเขต พร้อมรายชื่อวิชาที่เปิดสอน ดังนี้

|  campus   | subj |
|-----------|------|
| leetademy | code |
| leetademy | trek |
| hack-cool | code |
| hack-cool | math |

เมื่อ join ตาราง `students` ด้วยวิชาที่เปิดสอนโดยวิทยาเขต `leetademy` จะได้ว่า

| name | subj | grade |  campus   |
|------|------|-------|-----------|
| bar  | code | A     | leetademy |
| foo  | code | C+    | leetademy |
| foo  | trek | A     | leetademy |
| qux  | code | B+    | leetademy |
| qux  | trek | A     | leetademy |

หากนับตาม key `name` จะเห็นว่ามี `foo` และ `qux` ที่ลงทะเบียนเรียนครบ 2 วิชาตามที่วิทยาเขต `leetademy` เปิดสอน ซึ่งนี่ก็คือคำตอบของการหาร `students` ด้วยวิชาที่เปิดสอนโดย `leetademy` นั่นเอง หรือเขียนเป็นตารางผลลัพธ์ได้ว่า

| name |
|------|
| foo  |
| qux  |

ซึ่งคำสั่ง SQL สำหรับการดำเนินการนี้ ควรจะมีหน้าตาประมาณ

``` sql
SELECT name, subj
FROM   students
DIVISION (
    SELECT subj
    FROM   colleges
    WHERE  campus = 'leetademy'
) AS leetademy_courses
```

ปัญหาของการหารคือ DBA แทบทั้งหมดไม่มีคำสั่งนี้ให้ใช้ (ต่างจาก MINUS หรือการลบที่ยังพอมีให้ใช้บ้าง แม้บางเจ้าจะเปลี่ยนชื่อเป็น EXCEPT ก็ตาม) นั่นก็เพราะว่าท่านี้มันเป็นท่าที่เปลืองทรัพยากรมาก แถมไม่ได้ใช้กันบ่อยๆ เสียด้วย ...ซึ่งจะว่าไปแล้วมันก็ดูไม่ใช่ปัญหาเลยนี่หน่า

อย่างไรก็ตามปัญหาจริงๆ คือมันเป็นท่าที่อาจารย์ส่วนใหญ่ชอบเอาไปออกสอบ (เพราะมันเขียนได้ยากและไม่มีคำสั่งพื้นฐานให้ใช้ :P) ทำให้เราต้องหาท่าอ้อมๆ ที่ให้ผลลัพท์แบบเดียวกันมาใช้แทน

---

การจะเข้าใจการหารบนฐานข้อมูลได้ ถ้าลองถอยออกมาคิดแบบเขียนโปรแกรม ก็แค่ดูว่า set ที่เป็นตัวตั้งหารนั้นเป็น superset ของ set ที่ถูกหารหรือเปล่า

``` python
students_set = defaultdict(set)
for name, subj, grade in students:
    students_set[name].add(subj)

colleges_set = defaultdict(set)
for campus, subj in colleges:
    colleges_set[campus].add(subj)

output = set()
for name, subj_set in students_set.items():
    if subj_set >= colleges_set['leetademy']:
        output.add(name)
print(output)
```

แต่การทำงานบนฐานข้อมูล เรามักเขียนพวกนี้ทั้งหมดให้เป็น one-liner เพื่อที่จะรับประกันว่าระหว่างการ query จะไม่เกิด race condition กับ query อื่นๆ สิ่งที่ต้องทำก่อนอื่นใดคือพยายามกำจัดการสร้าง set ของข้อมูลล่วงหน้าซะ

ในที่นี้ ขั้นแรกเราจะกำจัดการสร้าง `colleges_set` โดยวน loop ใน `colleges` ทุกตัวดูว่าแต่ละ `subj` มีใน `students_set` หรือเปล่า

``` python
def learnt_leetademy(name):
    for campus, subj in colleges:
        if campus == 'leetademy':
            if subj not in students_set[name]:
                return False
    return True

output = set()
for name, _, _ in students:
    if learnt_leetademy(name):
        output.add(name)
print(output)
```

ขั้นต่อมาก็กำจัด `students_set` โดย loop เข้า `students` ดูว่านักเรียนตามชื่อ `name` ยังไม่ได้เรียนวิชา `subj` หรือเปล่า

``` python
def learnt(name, subj):
    for student_name, student_subj, _ in students:
        if student_name == name and student_subj == subj:
            return True
    return False

def learnt_leetademy(name):
    for campus, subj in colleges:
        if campus == 'leetademy':
            if not learnt(name, subj):
                return False
    return True

output = set()
for name, _, _ in students:
    if learnt_leetademy(name):
        output.add(name)
print(output)
```

เนื่องจากฟังก์ชัน `learnt` จะคืนค่า `True` ทันทีที่เข้าเงื่อนไข แต่จะคืนค่า `False` หลังจากจบ loop ไปเท่านั้น เราสามารถเขียนตรงนี้ใหม่ด้วย generator แล้ว wrap ด้านนอกด้วย `any(...)` ในทำนองเดียวกันกับ `learnt_leetademy` เพียงแค่เปลี่ยนไป wrap ด้านนอกด้วย `all(...)`

``` python
def learnt(name, subj):
    for student_name, student_subj, _ in students:
        if student_name == name and student_subj == subj:
            yield True

def learnt_leetademy(name):
    for campus, subj in colleges:
        if campus == 'leetademy':
            if not any(learnt(name, subj)):
                yield False

output = set()
for name, _, _ in students:
    if all(learnt_leetademy(name)):
        output.add(name)
print(output)
```

พอทุกฟังก์ชันเป็น single-statement ที่เขียนด้วย generator คราวนี้ก็ง่ายที่จะแปลงมันไปเป็น one-liner แล้ว ... จับมาเขียนสวยๆ ได้แบบนี้

``` python
print({
    name
    for name, _, _ in students
    if all(
        False
        for campus, subj in colleges
        if campus == 'leetademy'
        and not any(
            True
            for student_name, student_subj, _ in students
            if student_name == name
            and student_subj == subj
        )
    )
})
```

อย่างไรก็ตาม ใน DBA เรามักใช้เพียงแค่ `NOT EXISTS (SELECT * ...)` ในความหมายของ `not any(True ...)` เท่านั้น แต่เราทราบกันดีว่า `all(False ...)` มีค่าเทียบเท่ากับ `not any(True ...)` ดังนั้นโค้ดสุดท้ายใน SQL จะออกมาหน้าตาเช่นนี้

``` sql
SELECT DISTINCT name
FROM   students AS so
WHERE  NOT EXISTS (
    SELECT *
    FROM   colleges AS co
    WHERE  campus = 'leetademy'
    AND    NOT EXISTS (
        SELECT *
        FROM   students AS si
        WHERE  si.name = so.name
        AND    si.subj = co.subj
    )
)
```

---

## อ้างอิง

- [Steven Hauser: SQL Relational Algebra Examples][sql example]
- [Gregor Ulm: Relational Division in SQL The Easy Way][easy sql division]
- Victor M. Matos; Rebecca Grasser (1995). "A Simpler (and Better) SQL Approach to Relational Division". <cite>Journal of Information Systems Education</cite> <b>13</b>(2): 85–88. ISBN 0-471-18074-2.


[relational algebra]: //en.wikipedia.org/wiki/Relational_algebra
[sql example]: //www.tc.umn.edu/~hause011//code/SQLexample.txt
[easy sql division]: //gregorulm.com/relational-division-in-sql-the-easy-way/
