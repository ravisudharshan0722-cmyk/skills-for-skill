/**
 * Curated Question Bank for Teaching Eligibility Tests
 * Organizes authentic MCQs, Coding Challenges, and Teaching Scenarios
 * for supported languages and assessment levels.
 */

export const QUESTION_BANK = {
  // ==========================================
  // PYTHON
  // ==========================================
  python: {
    basics: {
      mcqs: [
        {
          id: 'py_b_1',
          question: 'What is the output of the following Python expression: type(3 / 2)?',
          options: ["<class 'int'>", "<class 'float'>", "<class 'double'>", "<class 'number'>"],
          correctIndex: 1,
          explanation: 'In Python 3, the single division operator `/` always performs floating-point division, returning a float.'
        },
        {
          id: 'py_b_2',
          question: 'Which of the following data types in Python is IMMUTABLE?',
          options: ['List', 'Dictionary', 'Tuple', 'Set'],
          correctIndex: 2,
          explanation: 'Tuples are immutable sequences in Python; their elements cannot be changed or assigned after creation.'
        },
        {
          id: 'py_b_3',
          question: 'What is the output of `"hello"[::-1]` in Python?',
          options: ["'hello'", "'olleh'", "'h'", "SyntaxError"],
          correctIndex: 1,
          explanation: 'Slice notation `[::-1]` specifies a step of -1, which reverses the sequence.'
        },
        {
          id: 'py_b_4',
          question: 'How do you check if a key exists in a Python dictionary `d`?',
          options: ['d.contains(key)', 'key in d', 'd.has_key(key)', 'exists(key, d)'],
          correctIndex: 1,
          explanation: 'The `key in d` syntax is the idiomatic, O(1) average-time operator to check key membership in Python dictionaries.'
        },
        {
          id: 'py_b_5',
          question: 'What is the output of `bool([])` and `bool([0])`?',
          options: ['False and False', 'True and True', 'False and True', 'True and False'],
          correctIndex: 2,
          explanation: 'An empty list `[]` evaluates to False (falsy), while a non-empty list `[0]` containing an element evaluates to True (truthy).'
        },
        {
          id: 'py_b_6',
          question: 'What keyword is used to define an anonymous, one-line function in Python?',
          options: ['def', 'anonymous', 'lambda', 'func'],
          correctIndex: 2,
          explanation: 'The `lambda` keyword defines anonymous inline functions in Python (e.g. `lambda x: x * 2`).'
        },
        {
          id: 'py_b_7',
          question: 'What is the output of `[x * 2 for x in range(3)]`?',
          options: ['[0, 2, 4]', '[2, 4, 6]', '[0, 1, 2]', '[0, 2]'],
          correctIndex: 0,
          explanation: 'range(3) produces 0, 1, 2. Multiplying each by 2 yields [0, 2, 4].'
        },
        {
          id: 'py_b_8',
          question: 'Which block in Python always executes regardless of whether an exception occurred or not?',
          options: ['catch', 'finally', 'except', 'ensure'],
          correctIndex: 1,
          explanation: 'The `finally` block in a try-except statement executes unconditionally, often used for clean-up tasks.'
        },
        {
          id: 'py_b_9',
          question: 'What does the `strip()` method on a string do in Python?',
          options: ['Removes all spaces everywhere in the string', 'Removes leading and trailing whitespace', 'Splits the string into a list', 'Converts uppercase characters to lowercase'],
          correctIndex: 1,
          explanation: '`strip()` removes whitespace characters (spaces, tabs, newlines) from the beginning and end of a string.'
        },
        {
          id: 'py_b_10',
          question: 'What is the output of `print(10 // 3, 10 % 3)`?',
          options: ['3.33 1', '3 1', '3 0', '4 1'],
          correctIndex: 1,
          explanation: '`//` is the floor division operator yielding 3, and `%` is the modulo operator giving remainder 1.'
        }
      ],
      coding: [
        {
          id: 'py_b_code_1',
          title: 'Palindrome Number Checker',
          description: 'Given an integer `n`, write a function `is_palindrome(n)` that returns True if `n` is a palindrome (reads the same backwards and forwards), and False otherwise. Negative numbers are not palindromes.',
          constraints: '-10^9 <= n <= 10^9',
          starterCode: `def is_palindrome(n: int) -> bool:
    # Write your solution here
    pass
`,
          sampleTestCases: [
            { input: '121', expected: 'True', explanation: '121 reads 121 from left to right and from right to left.' },
            { input: '-121', expected: 'False', explanation: 'From left to right it is -121. From right to left it is 121-.' },
            { input: '10', expected: 'False', explanation: 'Reads 01 from right to left.' }
          ],
          hiddenTestCases: [
            { input: '0', expected: 'True' },
            { input: '12321', expected: 'True' },
            { input: '123456', expected: 'False' },
            { input: '1000021', expected: 'False' }
          ]
        },
        {
          id: 'py_b_code_2',
          title: 'Count Vowels in String',
          description: 'Write a function `count_vowels(s: str) -> int` that counts and returns the number of vowels (a, e, i, o, u, case-insensitive) in a given string `s`.',
          constraints: '0 <= len(s) <= 10^4',
          starterCode: `def count_vowels(s: str) -> int:
    # Write your solution here
    pass
`,
          sampleTestCases: [
            { input: '"hello world"', expected: '3', explanation: 'Vowels: e, o, o (3 vowels)' },
            { input: '"Python"', expected: '1', explanation: 'Vowel: o (1 vowel)' },
            { input: '"AEIOU"', expected: '5', explanation: 'All 5 characters are vowels' }
          ],
          hiddenTestCases: [
            { input: '""', expected: '0' },
            { input: '"rhythm"', expected: '0' },
            { input: '"Skill Exchange Platform"', expected: '7' },
            { input: '"Quick Brown Fox Jumps Over Lazy Dog"', expected: '11' }
          ]
        }
      ],
      teaching: [
        {
          id: 'py_b_teach_1',
          prompt: 'A beginner student asks: "What is the difference between a List and a Tuple in Python, and when should I use which?" Explain this concept clearly using a real-world analogy and a simple code example.',
          guidance: 'Evaluate clarity, accuracy of mutability explanation, real-world analogy (e.g. shopping list vs GPS coordinate/birth certificate), and helpful pedagogical tone.'
        },
        {
          id: 'py_b_teach_2',
          prompt: 'A student wrote the following code and wonders why it enters an infinite loop:\n```python\ni = 1\nwhile i <= 5:\n    print(i)\n```\nHow would you explain the bug to them, help them fix it, and teach them a habit to avoid this in the future?',
          guidance: 'Evaluate pedagogical empathy, clear identification of the missing increment step, showing the corrected code, and teaching loop invariants.'
        }
      ]
    },
    medium: {
      mcqs: [
        {
          id: 'py_m_1',
          question: 'What is the purpose of the `*args` and `**kwargs` syntax in Python function signatures?',
          options: ['Pointer dereferencing and reference passing', 'Accepting variable number of positional and keyword arguments', 'Defining global generator functions', 'Enforcing static type constraints'],
          correctIndex: 1,
          explanation: '`*args` allows passing an arbitrary number of positional arguments (as a tuple), and `**kwargs` allows arbitrary keyword arguments (as a dictionary).'
        },
        {
          id: 'py_m_2',
          question: 'What is the difference between `deepcopy` and shallow `copy` in Python?',
          options: ['deepcopy creates a copy of the outermost object only', 'deepcopy recursively copies all objects found in the original, while shallow copy inserts references to objects found in the original', 'shallow copy works only on primitive types', 'There is no difference in modern Python versions'],
          correctIndex: 1,
          explanation: 'A shallow copy constructs a new compound object and inserts references into it. A deep copy recursively duplicates all nested objects.'
        },
        {
          id: 'py_m_3',
          question: 'What does a generator function return when called in Python?',
          options: ['A completed list of all computed values', 'A generator iterator object', 'None until next() is called', 'A memory pointer to heap space'],
          correctIndex: 1,
          explanation: 'A function containing `yield` statements returns a generator object without executing code until iterated over.'
        },
        {
          id: 'py_m_4',
          question: 'What is the output of this code?\n```python\ndef append_to(element, target=[]):\n    target.append(element)\n    return target\nprint(append_to(1))\nprint(append_to(2))\n```',
          options: ['[1] then [2]', '[1] then [1, 2]', '[1] then [2, 1]', 'TypeError'],
          correctIndex: 1,
          explanation: 'Default argument expressions in Python are evaluated once when the function is defined, making mutable default values (like lists) shared across calls.'
        },
        {
          id: 'py_m_5',
          question: 'What is Method Resolution Order (MRO) in Python, and which algorithm computes it?',
          options: ['Left-to-right DFS', 'C3 Linearization algorithm', 'Dijkstra shortest path', 'Breadth-First Search'],
          correctIndex: 1,
          explanation: 'Python uses the C3 Linearization algorithm to determine the order in which base classes are searched when resolving methods.'
        },
        {
          id: 'py_m_6',
          question: 'What does the `@property` decorator do in a Python class?',
          options: ['Makes the class immutable', 'Allows a method to be accessed like an attribute with getters/setters', 'Automatically registers the class with a database', 'Caches return values in memory'],
          correctIndex: 1,
          explanation: 'The `@property` decorator allows defining getter methods that can be accessed with dot notation without parentheses.'
        },
        {
          id: 'py_m_7',
          question: 'What is the time complexity of lookup in a Python `dict` on average vs worst case?',
          options: ['O(1) average, O(n) worst case', 'O(log n) average, O(n) worst case', 'O(1) average, O(1) worst case', 'O(n) average, O(n^2) worst case'],
          correctIndex: 0,
          explanation: 'Python dicts use hash tables with open addressing. Average lookup is O(1), and worst case (hash collisions) is O(n).'
        },
        {
          id: 'py_m_8',
          question: 'Which built-in module provides heap queue algorithm (priority queue) implementation in Python?',
          options: ['queue', 'heapq', 'collections', 'priority'],
          correctIndex: 1,
          explanation: '`heapq` provides min-heap operations (heappush, heappop, heapify) on standard Python lists.'
        },
        {
          id: 'py_m_9',
          question: 'What happens when `raise Exception()` occurs inside a `try` block and no matching `except` block catches it?',
          options: ['It is ignored silently', 'The `finally` block runs first, then the exception propagates up the call stack', 'The application halts immediately without executing `finally`', 'It defaults to returning None'],
          correctIndex: 1,
          explanation: 'The `finally` block always executes before an unhandled exception propagates up the stack.'
        },
        {
          id: 'py_m_10',
          question: 'What does `__slots__` do when defined in a Python class?',
          options: ['Restricts instance attributes and prevents creation of `__dict__`, saving memory', 'Defines database primary keys', 'Allows multi-threading across CPU cores', 'Enables dynamic method injection'],
          correctIndex: 0,
          explanation: '`__slots__` reserves space for a fixed set of attributes and disables the per-instance `__dict__`, significantly reducing memory usage.'
        }
      ],
      coding: [
        {
          id: 'py_m_code_1',
          title: 'Two Sum Problem',
          description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice. Return the indices sorted in ascending order.',
          constraints: '2 <= len(nums) <= 10^4, -10^9 <= nums[i] <= 10^9',
          starterCode: `def two_sum(nums: list[int], target: int) -> list[int]:
    # Write your solution here
    pass
`,
          sampleTestCases: [
            { input: 'nums = [2,7,11,15], target = 9', expected: '[0, 1]', explanation: 'nums[0] + nums[1] == 9, return [0, 1]' },
            { input: 'nums = [3,2,4], target = 6', expected: '[1, 2]', explanation: 'nums[1] + nums[2] == 6, return [1, 2]' },
            { input: 'nums = [3,3], target = 6', expected: '[0, 1]', explanation: 'nums[0] + nums[1] == 6, return [0, 1]' }
          ],
          hiddenTestCases: [
            { input: 'nums = [1,5,8,3], target = 13', expected: '[1, 2]' },
            { input: 'nums = [-3,4,3,90], target = 0', expected: '[0, 2]' },
            { input: 'nums = [10,20,30,40,50], target = 90', expected: '[3, 4]' }
          ]
        },
        {
          id: 'py_m_code_2',
          title: 'Valid Parentheses',
          description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets, and in the correct order.',
          constraints: '1 <= len(s) <= 10^4',
          starterCode: `def is_valid_parentheses(s: str) -> bool:
    # Write your solution here
    pass
`,
          sampleTestCases: [
            { input: '"()"', expected: 'True', explanation: 'Simple matching parentheses' },
            { input: '"()[]{}"', expected: 'True', explanation: 'All pairs properly matched' },
            { input: '"(]"', expected: 'False', explanation: 'Mismatched closing bracket' }
          ],
          hiddenTestCases: [
            { input: '"([)]"', expected: 'False' },
            { input: '"{[]}"', expected: 'True' },
            { input: '""', expected: 'True' },
            { input: '"((("', expected: 'False' }
          ]
        }
      ],
      teaching: [
        {
          id: 'py_m_teach_1',
          prompt: 'A student asks why their recursive function causes a `RecursionError: maximum recursion depth exceeded`. Explain the concept of a recursion base case, call stack frames, and how to safely debug or convert deep recursion.',
          guidance: 'Look for call stack visualization, explanation of base condition, why stack overflow occurs, and mention of iteration or sys.setrecursionlimit caveats.'
        },
        {
          id: 'py_m_teach_2',
          prompt: 'How would you teach the concept of Python Decorators to an intermediate programmer who understands functions as first-class citizens but struggles with closure syntax (`*args, **kwargs`)?',
          guidance: 'Look for step-by-step breakdown: wrapper functions, preserving arguments, returning functions, and practical example (like timing execution or logging).'
        }
      ]
    },
    advanced: {
      mcqs: [
        {
          id: 'py_a_1',
          question: 'What is Python\'s Global Interpreter Lock (GIL), and what is its primary effect on multithreading?',
          options: ['It synchronizes file I/O operations across disk sectors', 'It prevents multiple native threads from executing Python bytecodes simultaneously in CPython', 'It locks memory addresses to prevent garbage collection', 'It enforces static type checking during runtime'],
          correctIndex: 1,
          explanation: 'The GIL is a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecodes at once in standard CPython.'
        },
        {
          id: 'py_a_2',
          question: 'How does Python\'s cyclic garbage collector detect reference cycles that standard reference counting cannot collect?',
          options: ['Using Mark-and-Sweep with generational tracking (Gen 0, 1, 2) and trial deletion', 'By running a stop-the-world compaction on every allocation', 'Through static compile-time escape analysis', 'By automatically breaking weak references'],
          correctIndex: 0,
          explanation: 'CPython uses generational collection with trial deletion to identify unreferenced isolated clusters of objects that reference each other.'
        },
        {
          id: 'py_a_3',
          question: 'In `asyncio`, what is the key difference between `asyncio.gather()` and `asyncio.wait()`?',
          options: ['gather is synchronous while wait is asynchronous', 'gather returns results in order and aggregates futures; wait provides fine-grained completion conditions (FIRST_COMPLETED, ALL_COMPLETED)', 'wait cannot handle exceptions', 'gather works only with thread pools'],
          correctIndex: 1,
          explanation: '`asyncio.gather()` collects results into an ordered list, whereas `asyncio.wait()` returns `(done, pending)` sets and accepts conditions like `FIRST_COMPLETED`.'
        },
        {
          id: 'py_a_4',
          question: 'What dunder method must a metaclass implement to intercept class creation before `__init__`?',
          options: ['__call__', '__new__', '__prepare__', '__build__'],
          correctIndex: 1,
          explanation: '`__new__` on a metaclass allocates and returns the new class object, allowing modification of the class namespace before `__init__` is invoked.'
        },
        {
          id: 'py_a_5',
          question: 'What is the role of the descriptor protocol in Python (`__get__`, `__set__`, `__delete__`)?',
          options: ['It powers properties, methods, classmethods, and staticmethods under the hood', 'It parses docstrings into OpenAPI schemas', 'It manages operating system file descriptors', 'It optimizes bytecode compilation to machine code'],
          correctIndex: 0,
          explanation: 'Descriptors define how attribute access is interpreted and are the foundation of Python\'s property, method binding, and ORM attribute mapping.'
        },
        {
          id: 'py_a_6',
          question: 'In multiprocessing, why does Windows use `spawn` as the default start method whereas older Linux defaults to `fork`?',
          options: ['Windows lacks the POSIX `fork()` system call, so it spawns a fresh Python process and re-imports modules', 'Windows has lower process creation overhead than Linux', 'To avoid GIL conflicts across machines', 'Windows does not support multi-core CPUs'],
          correctIndex: 0,
          explanation: 'Windows does not have `fork()`, so `spawn` starts a fresh interpreter process and pickles necessary arguments across process boundaries.'
        },
        {
          id: 'py_a_7',
          question: 'What does `functools.lru_cache(maxsize=128)` do when applied to a pure function?',
          options: ['Serializes return values to disk', 'Memoizes recent call arguments and results using a Least Recently Used eviction policy', 'Compiles Python bytecode to C using Cython', 'Limits CPU consumption of the function'],
          correctIndex: 1,
          explanation: 'It creates a hash-table-backed cache of recent argument-to-return-value mappings, evicting the least recently used entries when `maxsize` is exceeded.'
        },
        {
          id: 'py_a_8',
          question: 'What is the difference between `@classmethod` and `@staticmethod` in Python?',
          options: ['classmethod receives the class (`cls`) as its implicit first argument, while staticmethod receives no implicit first argument', 'staticmethod can only be called from instances', 'classmethod cannot access class attributes', 'staticmethod has access to `self`'],
          correctIndex: 0,
          explanation: '`@classmethod` passes the calling class as `cls`, enabling alternative constructors and polymorphic class inheritance, while `@staticmethod` behaves like a plain function.'
        },
        {
          id: 'py_a_9',
          question: 'What security risk occurs when using Python\'s `pickle` module to deserialize untrusted user data?',
          options: ['Buffer overflow vulnerabilities in CPython', 'Arbitrary Remote Code Execution (RCE) via `__reduce__` exploit payloads', 'Denial of Service via regex exponential backtracking', 'Cross-site scripting (XSS)'],
          correctIndex: 1,
          explanation: 'Pickle is not secure against untrusted input; custom `__reduce__` methods can execute arbitrary OS commands when unpickled.'
        },
        {
          id: 'py_a_10',
          question: 'What is the purpose of context managers implementing `__enter__` and `__exit__`?',
          options: ['Dynamic typing conversion', 'Deterministic resource management (e.g., closing file descriptors, releasing locks)', 'Registering route handlers in web frameworks', 'Memory reallocation during garbage collection'],
          correctIndex: 1,
          explanation: 'Context managers guarantee setup and teardown actions (like releasing locks or closing files) via the `with` statement, even when exceptions occur.'
        }
      ],
      coding: [
        {
          id: 'py_a_code_1',
          title: 'Longest Substring Without Repeating Characters',
          description: 'Given a string `s`, find the length of the longest substring without duplicate characters. Implement an optimal O(n) solution using the sliding window technique.',
          constraints: '0 <= len(s) <= 5 * 10^4',
          starterCode: `def length_of_longest_substring(s: str) -> int:
    # Write your optimal O(n) solution here
    pass
`,
          sampleTestCases: [
            { input: '"abcabcbb"', expected: '3', explanation: 'The answer is "abc", with the length of 3.' },
            { input: '"bbbbb"', expected: '1', explanation: 'The answer is "b", with the length of 1.' },
            { input: '"pwwkew"', expected: '3', explanation: 'The answer is "wke", with the length of 3.' }
          ],
          hiddenTestCases: [
            { input: '""', expected: '0' },
            { input: '"au"', expected: '2' },
            { input: '"dvdf"', expected: '3' },
            { input: '"abcdefghijklmnopqrstuvwxyz"', expected: '26' }
          ]
        },
        {
          id: 'py_a_code_2',
          title: 'Merge K Sorted Lists',
          description: 'You are given an array of `k` linked-lists or sorted integer lists `lists`, each list is sorted in ascending order. Merge all the sorted lists into one sorted list and return it. Aim for O(N log k) complexity using a min-heap or divide-and-conquer.',
          constraints: '0 <= k <= 10^4, 0 <= total_elements <= 10^4',
          starterCode: `def merge_k_sorted(lists: list[list[int]]) -> list[int]:
    # Write your solution here
    pass
`,
          sampleTestCases: [
            { input: '[[1,4,5],[1,3,4],[2,6]]', expected: '[1, 1, 2, 3, 4, 4, 5, 6]', explanation: 'Merged sorted output' },
            { input: '[]', expected: '[]', explanation: 'Empty input' },
            { input: '[[]]', expected: '[]', explanation: 'List of empty lists' }
          ],
          hiddenTestCases: [
            { input: '[[10],[5],[1]]', expected: '[1, 5, 10]' },
            { input: '[[1,2,3],[4,5,6],[7,8,9]]', expected: '[1, 2, 3, 4, 5, 6, 7, 8, 9]' },
            { input: '[[-5,0,5],[-10,10]]', expected: '[-10, -5, 0, 5, 10]' }
          ]
        }
      ],
      teaching: [
        {
          id: 'py_a_teach_1',
          prompt: 'A senior engineer in your study group asks: "Why should we use `asyncio` instead of `threading` or `multiprocessing` for our high-throughput I/O-bound microservice, and what are the concurrency pitfalls to watch out for?" Provide a structured technical response with architectural pros/cons.',
          guidance: 'Evaluate coverage of single-threaded event loop vs OS threads, memory overhead per connection (C10K problem), non-blocking I/O vs CPU bottlenecks, and danger of blocking synchronous calls inside coroutines.'
        },
        {
          id: 'py_a_teach_2',
          prompt: 'How would you conduct a code review and mentor an engineer who wrote a custom thread-pool with manual locking that resulted in a deadlock? Describe your pedagogical strategy to teach deadlock conditions (Coffman conditions) and preventative patterns.',
          guidance: 'Evaluate identification of deadlock conditions (Mutual exclusion, Hold & wait, No preemption, Circular wait), teaching lock ordering, timeouts, or higher-level primitives (Queues/RLock), with empathetic mentoring tone.'
        }
      ]
    }
  },

  // ==========================================
  // JAVASCRIPT
  // ==========================================
  javascript: {
    basics: {
      mcqs: [
        {
          id: 'js_b_1',
          question: 'What is the output of `typeof null` in JavaScript?',
          options: ["'null'", "'object'", "'undefined'", "'boolean'"],
          correctIndex: 1,
          explanation: 'In JavaScript, `typeof null === "object"` is a legacy specification artifact from the initial implementation.'
        },
        {
          id: 'js_b_2',
          question: 'Which keyword defines a block-scoped variable that CANNOT be reassigned?',
          options: ['var', 'let', 'const', 'static'],
          correctIndex: 2,
          explanation: '`const` defines a block-scoped identifier that cannot be reassigned (though objects assigned to it remain mutable).'
        },
        {
          id: 'js_b_3',
          question: 'What is the difference between `==` and `===` in JavaScript?',
          options: ['`==` compares memory references; `===` compares values', '`==` performs type coercion before comparison; `===` requires identical types and values', '`===` is deprecated in ES6', 'There is no functional difference'],
          correctIndex: 1,
          explanation: '`==` (loose equality) converts operands to a common type before comparing, while `===` (strict equality) checks value and type without coercion.'
        },
        {
          id: 'js_b_4',
          question: 'What is the result of `[] + []` and `[] + {}` in JavaScript?',
          options: ['"" and "[object Object]"', '0 and NaN', 'undefined and null', 'TypeError'],
          correctIndex: 0,
          explanation: '`[] + []` converts both arrays to empty strings and concatenates to `""`. `[] + {}` converts `{}` to `"[object Object]"`.'
        },
        {
          id: 'js_b_5',
          question: 'Which Array method creates a NEW array populated with the results of calling a provided function on every element?',
          options: ['forEach', 'map', 'filter', 'reduce'],
          correctIndex: 1,
          explanation: '`Array.prototype.map()` creates and returns a new array with transformed elements.'
        },
        {
          id: 'js_b_6',
          question: 'What is the output of `console.log(1 + "2" + 3)`?',
          options: ['"123"', '6', '"33"', 'NaN'],
          correctIndex: 0,
          explanation: 'Addition evaluates left-to-right. `1 + "2"` coerces to string `"12"`, and `"12" + 3` coerces to `"123"`.'
        },
        {
          id: 'js_b_7',
          question: 'What does `Array.isArray([1, 2])` return?',
          options: ['true', 'false', '"array"', '1'],
          correctIndex: 0,
          explanation: '`Array.isArray()` reliably determines whether the passed value is an Array.'
        },
        {
          id: 'js_b_8',
          question: 'What is the scope of a variable declared with `var`?',
          options: ['Block scope', 'Function scope or global scope', 'Module scope only', 'Constant scope'],
          correctIndex: 1,
          explanation: '`var` declarations are scoped to the nearest enclosing function or global execution context, ignoring block `{}` boundaries.'
        },
        {
          id: 'js_b_9',
          question: 'Which method converts a JavaScript object into a JSON string?',
          options: ['JSON.parse()', 'JSON.stringify()', 'JSON.encode()', 'Object.toJSON()'],
          correctIndex: 1,
          explanation: '`JSON.stringify()` serializes a JavaScript object/value into a valid JSON string.'
        },
        {
          id: 'js_b_10',
          question: 'What is the output of `Boolean("")` and `Boolean("0")`?',
          options: ['false and false', 'false and true', 'true and false', 'true and true'],
          correctIndex: 1,
          explanation: 'An empty string `""` is falsy, but any non-empty string including `"0"` is truthy.'
        }
      ],
      coding: [
        {
          id: 'js_b_code_1',
          title: 'Array Chunking',
          description: 'Write a function `chunk(array, size)` that splits an array into groups the length of `size`. If array can\'t be split evenly, the final chunk will be the remaining elements.',
          constraints: 'array length >= 0, size >= 1',
          starterCode: `function chunk(array, size) {
  // Write your code here
}
`,
          sampleTestCases: [
            { input: 'chunk([1, 2, 3, 4], 2)', expected: '[[1,2],[3,4]]', explanation: 'Split evenly into groups of 2' },
            { input: 'chunk([1, 2, 3, 4, 5], 2)', expected: '[[1,2],[3,4],[5]]', explanation: 'Remaining element forms final chunk' }
          ],
          hiddenTestCases: [
            { input: 'chunk([], 3)', expected: '[]' },
            { input: 'chunk([1, 2], 5)', expected: '[[1,2]]' },
            { input: 'chunk([1, 2, 3, 4, 5, 6], 3)', expected: '[[1,2,3],[4,5,6]]' }
          ]
        },
        {
          id: 'js_b_code_2',
          title: 'Find Maximum in Array',
          description: 'Write a function `findMax(numbers)` that returns the largest number in an array. Return null if the array is empty.',
          constraints: '0 <= numbers.length <= 10^4',
          starterCode: `function findMax(numbers) {
  // Write your code here
}
`,
          sampleTestCases: [
            { input: 'findMax([1, 5, 3, 9, 2])', expected: '9', explanation: '9 is the maximum number' },
            { input: 'findMax([-10, -5, -20])', expected: '-5', explanation: '-5 is greater than -10 and -20' },
            { input: 'findMax([])', expected: 'null', explanation: 'Empty array returns null' }
          ],
          hiddenTestCases: [
            { input: 'findMax([42])', expected: '42' },
            { input: 'findMax([0, 0, 0])', expected: '0' },
            { input: 'findMax([-1, 100, 50, 999, 2])', expected: '999' }
          ]
        }
      ],
      teaching: [
        {
          id: 'js_b_teach_1',
          prompt: 'A beginner student is confused about `let`, `const`, and `var`. They ask: "Why do we have three keywords for variables in JavaScript?" How would you explain their history and when to use `const` vs `let` in modern development?',
          guidance: 'Look for explanation of hoisting, block scope vs function scope, temporal dead zone, modern preference for const by default, and let for reassignment.'
        },
        {
          id: 'js_b_teach_2',
          prompt: 'A student writes `console.log(0.1 + 0.2 === 0.3)` and is shocked to see `false`. Explain IEEE 754 floating-point representation in simple, beginner-friendly terms with an analogy and a practical workaround (like `Number.EPSILON`).',
          guidance: 'Look for clear analogy (like 1/3 in decimal cannot be represented finitely), explaining binary fractional precision, and showing `Math.abs(a - b) < Number.EPSILON`.'
        }
      ]
    },
    medium: {
      mcqs: [
        {
          id: 'js_m_1',
          question: 'What is a Closure in JavaScript?',
          options: ['A function bundled together with references to its lexical environment', 'A method that closes a WebSocket connection', 'A block of code wrapped in try-catch', 'A module bundler plugin'],
          correctIndex: 0,
          explanation: 'A closure gives an inner function access to its outer enclosing function\'s scope variables even after the outer function has returned.'
        },
        {
          id: 'js_m_2',
          question: 'What is the order of console output?\n```javascript\nconsole.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);\n```',
          options: ['1, 4, 3, 2', '1, 2, 3, 4', '1, 4, 2, 3', '1, 3, 4, 2'],
          correctIndex: 0,
          explanation: 'Synchronous code runs first (1, 4). Microtasks (Promise.then -> 3) run before macrotasks (setTimeout -> 2).'
        },
        {
          id: 'js_m_3',
          question: 'What does the `bind()` method on a function do?',
          options: ['Immediately invokes the function with arguments', 'Creates a new function with its `this` keyword set to the provided value and initial arguments', 'Locks the function code against modifications', 'Binds an event listener to the DOM'],
          correctIndex: 1,
          explanation: '`bind()` returns a bound function with permanent `this` context without calling it immediately.'
        },
        {
          id: 'js_m_4',
          question: 'What happens if a Promise created inside `async/await` throws an error and is not caught?',
          options: ['The browser reloads', 'It results in an UnhandledPromiseRejection', 'It defaults to returning null', 'It restarts the function'],
          correctIndex: 1,
          explanation: 'Uncaught errors in async functions reject the returned promise, triggering an unhandled rejection event.'
        },
        {
          id: 'js_m_5',
          question: 'What is Event Bubbling in the browser DOM?',
          options: ['Events originate at the root and travel down to the target', 'Events trigger on the innermost target element first, then bubble up through ancestors in the DOM tree', 'Events are cancelled automatically', 'Events trigger only once on window'],
          correctIndex: 1,
          explanation: 'In the bubbling phase, the event is fired on the target element and subsequently propagates upward through its parent elements.'
        },
        {
          id: 'js_m_6',
          question: 'How do you prevent an event from bubbling up to parent handlers?',
          options: ['event.preventDefault()', 'event.stopPropagation()', 'event.stop()', 'return false'],
          correctIndex: 1,
          explanation: '`event.stopPropagation()` stops further propagation of the current event in the capturing and bubbling phases.'
        },
        {
          id: 'js_m_7',
          question: 'What is the prototype chain in JavaScript?',
          options: ['A mechanism where objects inherit properties and methods from other objects via `__proto__` / `prototype`', 'A blockchain implementation in V8', 'An array of function pointers', 'A build pipeline step in Webpack'],
          correctIndex: 0,
          explanation: 'Each object has an internal link to another object called its prototype. Properties are searched up the chain until `null` is reached.'
        },
        {
          id: 'js_m_8',
          question: 'What is the output of `[1, 2, 10, 21].sort()`?',
          options: ['[1, 2, 10, 21]', '[1, 10, 2, 21]', '[21, 10, 2, 1]', 'TypeError'],
          correctIndex: 1,
          explanation: 'By default, `Array.prototype.sort()` converts elements to strings and compares their UTF-16 code unit values in lexicographical order.'
        },
        {
          id: 'js_m_9',
          question: 'What does `Object.freeze()` do to an object?',
          options: ['Prevents new properties from being added, existing properties from being removed or modified (shallow freeze)', 'Freezes all nested objects recursively', 'Converts all properties to getters', 'Compresses the object in memory'],
          correctIndex: 0,
          explanation: '`Object.freeze()` makes an object\'s immediate properties immutable, but nested objects can still be mutated unless recursively frozen.'
        },
        {
          id: 'js_m_10',
          question: 'What does the spread syntax `...` do when used on an iterable?',
          options: ['Expands the elements of an iterable in places where zero or more arguments or elements are expected', 'Compresses data into a Buffer', 'Defines a pointer', 'Calls the garbage collector'],
          correctIndex: 0,
          explanation: 'Spread syntax unpacks elements of an array/iterable into arguments, array literals, or object properties.'
        }
      ],
      coding: [
        {
          id: 'js_m_code_1',
          title: 'Debounce Function Implementation',
          description: 'Implement a debounce function `debounce(fn, delay)` that ensures `fn` is only invoked after `delay` milliseconds have elapsed since the last time it was called. When called repeatedly within the delay window, the timer resets.',
          constraints: 'delay >= 0',
          starterCode: `function debounce(fn, delay) {
  // Return a debounced version of fn
}
`,
          sampleTestCases: [
            { input: 'Debounced search input with 300ms delay', expected: 'Only final query fired', explanation: 'Intermediate keystrokes do not trigger execution' }
          ],
          hiddenTestCases: [
            { input: 'rapid 5 calls', expected: 'fn called once with final args' }
          ]
        },
        {
          id: 'js_m_code_2',
          title: 'Deep Clone Object',
          description: 'Implement a function `deepClone(obj)` that returns a deep copy of an object supporting nested objects, arrays, and primitive values.',
          constraints: 'Acyclic structures, nested objects and arrays',
          starterCode: `function deepClone(obj) {
  // Write your deep clone function here
}
`,
          sampleTestCases: [
            { input: 'deepClone({ a: 1, b: { c: 2 } })', expected: '{"a":1,"b":{"c":2}}', explanation: 'Mutating returned clone must not affect original' }
          ],
          hiddenTestCases: [
            { input: 'deepClone([1, [2, 3]])', expected: '[1,[2,3]]' },
            { input: 'deepClone({ x: null, y: "test" })', expected: '{"x":null,"y":"test"}' }
          ]
        }
      ],
      teaching: [
        {
          id: 'js_m_teach_1',
          prompt: 'A learner asks: "Why does `this` change depending on how a function is called in JavaScript, and how do arrow functions solve this problem?" Explain the 4 rules of `this` binding (Default, Implicit, Explicit, New) and how lexical `this` works in arrow functions.',
          guidance: 'Look for clear explanation of call-site determine this, call/apply/bind, method invocation, and arrow functions adopting this from enclosing lexical scope.'
        },
        {
          id: 'js_m_teach_2',
          prompt: 'How would you explain the JavaScript Event Loop (Call Stack, Web APIs, Microtask Queue, Task Queue) to an intermediate developer using a restaurant or airport analogy?',
          guidance: 'Look for vivid analogy: Call stack (chef), Web APIs (prep cook / kitchen timer), Microtask queue (VIP express order), Task queue (standard order ticket), Event loop checking if call stack is clear.'
        }
      ]
    },
    advanced: {
      mcqs: [
        {
          id: 'js_a_1',
          question: 'What is the V8 engine\'s Hidden Classes (Shapes) and Inline Caching mechanism?',
          options: ['An optimization that tracks object layout at runtime to allow fast property access without dictionary lookups', 'A CSS obfuscation system', 'A memory encryption protocol', 'A garbage collection algorithm'],
          correctIndex: 0,
          explanation: 'V8 assigns hidden classes to objects with matching property layouts, allowing inline caches to replace dynamic lookups with direct memory offset offsets.'
        },
        {
          id: 'js_a_2',
          question: 'What is the purpose of `WeakMap` and `WeakSet` in JavaScript compared to standard `Map` and `Set`?',
          options: ['They allow weak network encryption', 'Keys must be objects and are held weakly, preventing memory leaks by allowing garbage collection when no other references exist', 'They have O(log n) lookup instead of O(1)', 'They can only store primitive symbols'],
          correctIndex: 1,
          explanation: 'WeakMap and WeakSet hold weak references to object keys; if no other strong references exist, the entry can be garbage collected.'
        },
        {
          id: 'js_a_3',
          question: 'What is the purpose of `Proxy` and `Reflect` in ECMAScript?',
          options: ['Network proxying for HTTP requests', 'Metaprogramming: Proxy intercepts object operations (traps), and Reflect provides default forwarding methods', 'Server-side rendering optimization', 'Thread synchronization across Web Workers'],
          correctIndex: 1,
          explanation: '`Proxy` intercepts fundamental operations (get, set, apply, construct), while `Reflect` provides corresponding methods with clean boolean returns.'
        },
        {
          id: 'js_a_4',
          question: 'What is the difference between `SharedArrayBuffer` and standard `ArrayBuffer`?',
          options: ['SharedArrayBuffer can be accessed by multiple Web Workers simultaneously with `Atomics` operations', 'SharedArrayBuffer is stored in localStorage', 'SharedArrayBuffer only supports 16-bit integers', 'There is no difference'],
          correctIndex: 0,
          explanation: '`SharedArrayBuffer` shares underlying memory across execution contexts, enabling multithreaded shared memory concurrency via the `Atomics` API.'
        },
        {
          id: 'js_a_5',
          question: 'How does JavaScript generator delegation `yield*` function?',
          options: ['It delegates iteration control to another iterable or generator until it is exhausted', 'It pauses all async functions globally', 'It forces garbage collection of the generator', 'It terminates the generator loop immediately'],
          correctIndex: 0,
          explanation: '`yield*` delegates to another generator or iterable, forwarding values and yielding results until the inner generator returns.'
        },
        {
          id: 'js_a_6',
          question: 'What does `Symbol.iterator` do when implemented on an object?',
          options: ['Marks the object as an iterable conforming to the iteration protocol (`for...of`, spread)', 'Makes the object immutable', 'Registers a callback with the event loop', 'Converts the object to an ArrayBuffer'],
          correctIndex: 0,
          explanation: 'Objects implementing `[Symbol.iterator]()` return an iterator object with a `next()` method, enabling `for...of` loops.'
        },
        {
          id: 'js_a_7',
          question: 'What causes a deoptimization (Deopt) in V8 Turbofan JIT compiler?',
          options: ['Type feedback polymorphic/megamorphic mutations, changing object shapes, or unexpected argument types', 'Writing too many comments in source code', 'Using strict equality `===`', 'Executing loops with more than 100 iterations'],
          correctIndex: 0,
          explanation: 'Turbofan optimizes code assuming stable types. If an assumption is violated (e.g., passing a string where an int was expected), it deoptimizes back to Ignition bytecode.'
        },
        {
          id: 'js_a_8',
          question: 'What is a memory leak hazard commonly associated with DOM event listeners and closures in Single Page Applications?',
          options: ['Detached DOM trees retained in memory because event listeners or closure references still point to them', 'Too many `const` variable declarations', 'Using JSON.stringify() on large objects', 'Using CSS flexbox instead of grid'],
          correctIndex: 0,
          explanation: 'If an element is removed from the DOM but event listeners or closures still reference it, the entire detached DOM subtree cannot be garbage collected.'
        },
        {
          id: 'js_a_9',
          question: 'What does the `queueMicrotask()` API do?',
          options: ['Schedules a callback to be executed before the browser yields control back to the event loop, at microtask checkpoint', 'Spawns a new Web Worker thread', 'Delays execution by 1 second', 'Cancels ongoing network fetch requests'],
          correctIndex: 0,
          explanation: '`queueMicrotask()` enqueues a function to run at the end of the current task before rendering or macro-tasks proceed.'
        },
        {
          id: 'js_a_10',
          question: 'How do JavaScript Modules (ESM) handle circular dependencies compared to CommonJS?',
          options: ['ESM creates live bindings to exports, resolving references when evaluated, while CommonJS returns a partially loaded snapshot', 'ESM crashes with fatal error on circular imports', 'CommonJS supports live bindings', 'Neither supports circular dependencies'],
          correctIndex: 0,
          explanation: 'ESM creates live bindings in its module map during the linking phase, allowing circular references to resolve correctly when accessed after execution.'
        }
      ],
      coding: [
        {
          id: 'js_a_code_1',
          title: 'Promise.all Polyfill',
          description: 'Implement a polyfill for `Promise.all(promises)`. It takes an iterable of promises and returns a single Promise that resolves to an array of the results of the input promises, maintaining original order. If any promise rejects, it immediately rejects with that error.',
          constraints: 'Must handle empty arrays, non-promise values, and preserve index order.',
          starterCode: `function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    // Write your implementation here
  });
}
`,
          sampleTestCases: [
            { input: 'promiseAll([Promise.resolve(1), 2, Promise.resolve(3)])', expected: '[1, 2, 3]', explanation: 'Resolves all values in order' },
            { input: 'promiseAll([Promise.resolve(1), Promise.reject("err")])', expected: 'Rejects with "err"', explanation: 'Fails fast on rejection' }
          ],
          hiddenTestCases: [
            { input: 'promiseAll([])', expected: '[]' },
            { input: 'promiseAll([delay(50, "B"), delay(10, "A")])', expected: '["B", "A"]' }
          ]
        },
        {
          id: 'js_a_code_2',
          title: 'LRU Cache Implementation',
          description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with `get(key)` and `put(key, value)` operations in O(1) average time complexity.',
          constraints: 'capacity >= 1, key and value are positive integers',
          starterCode: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    // Initialize data structures
  }

  get(key) {
    // Return value or -1
  }

  put(key, value) {
    // Update or insert, evicting LRU if over capacity
  }
}
`,
          sampleTestCases: [
            { input: 'cache = new LRUCache(2); cache.put(1, 1); cache.put(2, 2); cache.get(1); cache.put(3, 3); cache.get(2);', expected: '-1', explanation: 'Key 2 was evicted because key 1 was accessed' }
          ],
          hiddenTestCases: [
            { input: 'capacity 1 operations', expected: 'Accurate eviction' }
          ]
        }
      ],
      teaching: [
        {
          id: 'js_a_teach_1',
          prompt: 'An engineering team is seeing unpredictable UI lag and memory bloat in their enterprise React/Next.js dashboard. How would you teach the team how to profile memory leaks using Chrome DevTools (Heap Snapshots, Allocation Timelines, Detached Elements)?',
          guidance: 'Look for structured methodology: baseline snapshot, performing actions, 3-snapshot technique, inspecting Retainers tree, identifying detached DOM nodes and uncleaned timers/event listeners.'
        },
        {
          id: 'js_a_teach_2',
          prompt: 'How would you explain the architectural differences between Web Workers, Service Workers, and Worklets, and teach a senior engineer how to offload heavy computation without blocking the 60fps main UI thread?',
          guidance: 'Look for distinction between dedicated Web Workers (CPU tasks), Service Workers (network proxy/caching/push), Audio/Paint Worklets, communication via postMessage/Transferables, and Atomics with SharedArrayBuffer.'
        }
      ]
    }
  },

  // ==========================================
  // JAVA
  // ==========================================
  java: {
    basics: {
      mcqs: [
        {
          id: 'jv_b_1',
          question: 'What is the size of an `int` primitive in Java?',
          options: ['16 bits (2 bytes)', '32 bits (4 bytes)', '64 bits (8 bytes)', 'Platform dependent'],
          correctIndex: 1,
          explanation: 'In Java, an `int` is strictly guaranteed to be a 32-bit signed two\'s complement integer across all platforms.'
        },
        {
          id: 'jv_b_2',
          question: 'Which principle of Object-Oriented Programming is demonstrated by having multiple methods with the same name but different parameters in the same class?',
          options: ['Method Overriding', 'Method Overloading', 'Encapsulation', 'Abstraction'],
          correctIndex: 1,
          explanation: 'Method Overloading (compile-time polymorphism) allows multiple methods with identical names but different parameter lists within the same class.'
        },
        {
          id: 'jv_b_3',
          question: 'What is the default value of a boolean field in a Java class?',
          options: ['true', 'false', 'null', '0'],
          correctIndex: 1,
          explanation: 'Instance and static boolean variables in Java default to `false` when not explicitly initialized.'
        },
        {
          id: 'jv_b_4',
          question: 'Which keyword in Java is used to inherit from a class?',
          options: ['implements', 'extends', 'inherits', 'super'],
          correctIndex: 1,
          explanation: 'The `extends` keyword is used for class inheritance in Java, while `implements` is used for interfaces.'
        },
        {
          id: 'jv_b_5',
          question: 'What is the difference between String and StringBuilder in Java?',
          options: ['String is mutable; StringBuilder is immutable', 'String is immutable; StringBuilder is mutable', 'StringBuilder is thread-safe; String is not', 'There is no difference'],
          correctIndex: 1,
          explanation: '`String` instances are immutable in Java. `StringBuilder` provides a mutable sequence of characters optimized for modifications.'
        },
        {
          id: 'jv_b_6',
          question: 'What happens when `str1 == str2` is executed for two distinct String objects with the same content?',
          options: ['It compares character contents and returns true', 'It compares memory references and returns false unless both refer to the same interned string', 'It throws a NullPointerException', 'It fails compilation'],
          correctIndex: 1,
          explanation: 'In Java, `==` compares reference addresses for objects. To compare string values, `equals()` must be used.'
        },
        {
          id: 'jv_b_7',
          question: 'Which access modifier makes a member accessible ONLY within its own class?',
          options: ['public', 'protected', 'default (package-private)', 'private'],
          correctIndex: 3,
          explanation: '`private` members are accessible exclusively within the body of the declaring class.'
        },
        {
          id: 'jv_b_8',
          question: 'What is the return type of a Java constructor?',
          options: ['void', 'The class type itself', 'Object', 'Constructors have no return type'],
          correctIndex: 3,
          explanation: 'Constructors in Java do not specify any return type, not even `void`.'
        },
        {
          id: 'jv_b_9',
          question: 'Which data structure in `java.util` implements a resizable array?',
          options: ['LinkedList', 'ArrayList', 'HashSet', 'Vector'],
          correctIndex: 1,
          explanation: '`ArrayList` is the standard resizable-array implementation of the `List` interface in Java.'
        },
        {
          id: 'jv_b_10',
          question: 'What is the root class of all classes in the Java class hierarchy?',
          options: ['java.lang.Class', 'java.lang.Object', 'java.lang.System', 'java.lang.Root'],
          correctIndex: 1,
          explanation: 'Every class in Java directly or indirectly descends from `java.lang.Object`.'
        }
      ],
      coding: [
        {
          id: 'jv_b_code_1',
          title: 'Reverse String in Java',
          description: 'Write a public static method `reverseString(String s)` that returns the reversed string. If the string is null, return null.',
          constraints: 's.length() <= 10^4',
          starterCode: `public class Solution {
    public static String reverseString(String s) {
        // Write your solution here
        return null;
    }
}
`,
          sampleTestCases: [
            { input: '"hello"', expected: '"olleh"', explanation: 'Reversed order of characters' },
            { input: '"Java"', expected: '"avaJ"', explanation: 'Case is preserved' }
          ],
          hiddenTestCases: [
            { input: '""', expected: '""' },
            { input: '"a"', expected: '"a"' },
            { input: '"Skill Exchange"', expected: '"egnahcxE llikS"' }
          ]
        },
        {
          id: 'jv_b_code_2',
          title: 'Find Even Numbers Count',
          description: 'Write a public static method `countEvens(int[] nums)` that returns the count of even integers in the given array.',
          constraints: 'nums.length <= 10^4',
          starterCode: `public class Solution {
    public static int countEvens(int[] nums) {
        // Write your solution here
        return 0;
    }
}
`,
          sampleTestCases: [
            { input: '[2, 1, 2, 3, 4]', expected: '3', explanation: '2, 2, and 4 are even (count 3)' },
            { input: '[2, 2, 0]', expected: '3', explanation: 'All numbers are even' },
            { input: '[1, 3, 5]', expected: '0', explanation: 'No even numbers' }
          ],
          hiddenTestCases: [
            { input: '[]', expected: '0' },
            { input: '[-2, -4, -5]', expected: '2' },
            { input: '[100, 201, 302, 403]', expected: '2' }
          ]
        }
      ],
      teaching: [
        {
          id: 'jv_b_teach_1',
          prompt: 'A Java beginner asks: "Why does `String s1 = new String(\"hello\"); String s2 = new String(\"hello\"); s1 == s2` evaluate to false, but `s1.equals(s2)` evaluates to true?" How would you teach them the difference between the String Pool, heap objects, and reference vs value equality?',
          guidance: 'Look for clear explanation of stack vs heap, reference comparison vs content comparison, String Constant Pool, and visual analogy (two identical houses with different addresses).'
        },
        {
          id: 'jv_b_teach_2',
          prompt: 'Explain the 4 pillars of Object-Oriented Programming (Encapsulation, Inheritance, Polymorphism, Abstraction) using a single coherent real-world vehicle/car analogy that a high-school student could easily understand.',
          guidance: 'Look for coherent single analogy: Encapsulation (hood protecting engine), Inheritance (Sedan extends Car), Polymorphism (honk() sounds different), Abstraction (steering wheel hides steering rack mechanics).'
        }
      ]
    },
    medium: {
      mcqs: [
        {
          id: 'jv_m_1',
          question: 'How does `HashMap` handle hash collisions internally in Java 8 and later?',
          options: ['Using open addressing with quadratic probing', 'Separate chaining with linked lists that convert to balanced red-black trees when a bucket exceeds 8 nodes', 'By rehashing the entire table immediately', 'By discarding duplicate keys'],
          correctIndex: 1,
          explanation: 'Java 8 optimizes HashMap buckets: when bucket size exceeds `TREEIFY_THRESHOLD` (8) and table capacity >= 64, the linked list transforms into a Red-Black Tree, improving collision lookup from O(n) to O(log n).'
        },
        {
          id: 'jv_m_2',
          question: 'What is the contract between `equals()` and `hashCode()` in Java?',
          options: ['If two objects are equal according to `equals()`, they must produce the same `hashCode()`', 'If two objects have the same hashCode, they must be equal according to equals()', 'Overriding equals() automatically updates hashCode()', 'There is no contract'],
          correctIndex: 0,
          explanation: 'The Java specification mandates that if `a.equals(b)` is true, then `a.hashCode() == b.hashCode()` must also be true. The reverse is not required due to collisions.'
        },
        {
          id: 'jv_m_3',
          question: 'What does the `volatile` keyword guarantee in Java multi-threading?',
          options: ['Atomicity for compound operations like `count++`', 'Visibility of changes across threads (reads/writes directly to main memory) and prevents instruction reordering', 'Mutual exclusion lock on the variable', 'Prevents garbage collection'],
          correctIndex: 1,
          explanation: '`volatile` guarantees that writes are immediately flushed to main memory and reads bypass thread-local CPU caches, establishing a happens-before relationship, but does NOT provide atomicity.'
        },
        {
          id: 'jv_m_4',
          question: 'What is the difference between `Comparable` and `Comparator` in Java?',
          options: ['Comparable defines natural ordering via `compareTo()`; Comparator defines custom external ordering via `compare()`', 'Comparable is deprecated in Java 8', 'Comparator is for primitive types only', 'Comparable is mutable; Comparator is immutable'],
          correctIndex: 0,
          explanation: '`Comparable<T>` is implemented by the class itself (`compareTo`), while `Comparator<T>` is an external strategy passed to sort methods (`compare`).'
        },
        {
          id: 'jv_m_5',
          question: 'What is a Checked Exception in Java?',
          options: ['An exception inheriting from `RuntimeException`', 'An exception that must be either declared in the `throws` clause or caught in a `try-catch` block at compile time', 'An error thrown by the JVM such as OutOfMemoryError', 'An exception that cannot be caught'],
          correctIndex: 1,
          explanation: 'Checked exceptions (subclasses of `Exception` excluding `RuntimeException`) are checked at compile time.'
        },
        {
          id: 'jv_m_6',
          question: 'What does the `final` keyword signify when applied to a class, a method, and a variable respectively?',
          options: ['Class cannot be extended; method cannot be overridden; variable cannot be reassigned', 'Class is abstract; method is synchronized; variable is constant', 'Class is private; method is static; variable is volatile', 'Class is singleton; method has no body; variable is cleared'],
          correctIndex: 0,
          explanation: '`final class` prevents inheritance, `final method` prevents overriding in subclasses, and `final variable` cannot have its reference/value reassigned.'
        },
        {
          id: 'jv_m_7',
          question: 'What is the difference between `ConcurrentHashMap` and `Collections.synchronizedMap()`?',
          options: ['ConcurrentHashMap locks bucket-level/nodes (lock striping), while synchronizedMap locks the entire map on every operation', 'synchronizedMap is faster under high concurrency', 'ConcurrentHashMap allows null keys', 'ConcurrentHashMap is not thread-safe'],
          correctIndex: 0,
          explanation: '`ConcurrentHashMap` provides lock-free reads and fine-grained lock striping for writes, avoiding the global bottleneck of `synchronizedMap`.'
        },
        {
          id: 'jv_m_8',
          question: 'What is Type Erasure in Java Generics?',
          options: ['The compiler removes generic type parameters during compilation, replacing them with bounds (or Object) and inserting casts', 'Generics are evaluated dynamically by the JVM at runtime', 'A tool to delete unused types from JAR files', 'A feature introduced in Java 17'],
          correctIndex: 0,
          explanation: 'Java implemented generics via type erasure for backward compatibility with pre-Java 5 bytecodes. Generic types do not exist at runtime.'
        },
        {
          id: 'jv_m_9',
          question: 'What is the difference between `Stream.map()` and `Stream.flatMap()` in the Java Streams API?',
          options: ['map flattens collections into a single stream', 'map transforms each element into another object (1:1); flatMap transforms each element into a stream and flattens all streams into one (1:many)', 'flatMap is parallel while map is sequential', 'map is terminal; flatMap is intermediate'],
          correctIndex: 1,
          explanation: '`map` produces one output per input element. `flatMap` produces a stream of elements for each input and flattens the resulting streams.'
        },
        {
          id: 'jv_m_10',
          question: 'What does the `try-with-resources` statement do in Java 7+?',
          options: ['Automatically closes resources implementing `AutoCloseable` at the end of the statement', 'Catches multiple exceptions in one block', 'Restarts failed threads', 'Allocates heap memory directly'],
          correctIndex: 0,
          explanation: '`try-with-resources` guarantees that any object implementing `AutoCloseable` has its `close()` method invoked when exiting the block.'
        }
      ],
      coding: [
        {
          id: 'jv_m_code_1',
          title: 'Group Anagrams',
          description: 'Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.',
          constraints: '1 <= strs.length <= 10^4, 0 <= strs[i].length <= 100',
          starterCode: `import java.util.*;

public class Solution {
    public static List<List<String>> groupAnagrams(String[] strs) {
        // Write your solution here
        return new ArrayList<>();
    }
}
`,
          sampleTestCases: [
            { input: '["eat","tea","tan","ate","nat","bat"]', expected: '[["bat"],["nat","tan"],["ate","eat","tea"]]', explanation: 'Strings with identical character counts are grouped' }
          ],
          hiddenTestCases: [
            { input: '[""]', expected: '[[""]]' },
            { input: '["a"]', expected: '[["a"]]' }
          ]
        },
        {
          id: 'jv_m_code_2',
          title: 'Binary Search Implementation',
          description: 'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return -1. You must write an algorithm with O(log n) runtime complexity.',
          constraints: '1 <= nums.length <= 10^4, all integers are unique',
          starterCode: `public class Solution {
    public static int search(int[] nums, int target) {
        // Write your O(log n) binary search here
        return -1;
    }
}
`,
          sampleTestCases: [
            { input: 'nums = [-1,0,3,5,9,12], target = 9', expected: '4', explanation: '9 exists in nums and its index is 4' },
            { input: 'nums = [-1,0,3,5,9,12], target = 2', expected: '-1', explanation: '2 does not exist in nums' }
          ],
          hiddenTestCases: [
            { input: 'nums = [5], target = 5', expected: '0' },
            { input: 'nums = [2, 5], target = 0', expected: '-1' },
            { input: 'nums = [1, 3, 5, 7, 9, 11], target = 11', expected: '5' }
          ]
        }
      ],
      teaching: [
        {
          id: 'jv_m_teach_1',
          prompt: 'A student asks: "Why should I bother writing custom `equals()` and `hashCode()` methods when my class works fine in an `ArrayList`?" Explain the internal workings of `HashSet` / `HashMap` to show what breaks when this contract is violated.',
          guidance: 'Look for explanation of bucket index calculation via hashCode(), equals() resolution for collisions, and demonstrating lost/duplicate entries in HashSet without proper hashCode.'
        },
        {
          id: 'jv_m_teach_2',
          prompt: 'How would you teach the difference between Checked and Unchecked exceptions in Java, and what design guidelines would you give for deciding whether to create a custom checked or unchecked exception?',
          guidance: 'Look for distinction between recoverable conditions (checked) vs programming errors/bugs (unchecked), modern trend toward unchecked (Spring/Hibernate), and clean exception translation patterns.'
        }
      ]
    },
    advanced: {
      mcqs: [
        {
          id: 'jv_a_1',
          question: 'What is the Java Memory Model (JMM) "Happens-Before" relationship?',
          options: ['A formal guarantee that memory writes by one thread are guaranteed to be visible to another thread at a specific point', 'A garbage collection pause order', 'The order in which classes are loaded by the ClassLoader', 'A thread priority scheduling formula'],
          correctIndex: 0,
          explanation: 'The JMM happens-before relationship defines orderings (e.g., monitor release happens-before monitor acquire, volatile write happens-before volatile read) ensuring memory visibility.'
        },
        {
          id: 'jv_a_2',
          question: 'How does the Z Garbage Collector (ZGC) achieve sub-millisecond maximum pause times in modern OpenJDK?',
          options: ['By stopping the world and using all CPU cores for 100ms', 'Using colored pointers and load barriers to perform concurrent marking, relocation, and reference processing without long STW pauses', 'By disabling heap compaction entirely', 'By forcing stack allocation for all objects'],
          correctIndex: 1,
          explanation: 'ZGC utilizes reference coloring and load barriers to relocate and compact memory concurrently while application threads are actively executing.'
        },
        {
          id: 'jv_a_3',
          question: 'What is the ForkJoinPool and how does work-stealing work in Java concurrency?',
          options: ['Worker threads each have a double-ended queue (deque); idle threads steal tasks from the tail of busy threads\' deques', 'A pool of operating system processes that communicate via shared sockets', 'A locking mechanism that prevents threads from entering synchronized blocks', 'A thread pool dedicated exclusively to database transactions'],
          correctIndex: 0,
          explanation: '`ForkJoinPool` threads push subtasks to their local deque head and steal pending subtasks from the tail of other threads\' deques, maximizing CPU utilization.'
        },
        {
          id: 'jv_a_4',
          question: 'What is the difference between Virtual Threads (Project Loom) in Java 21+ and traditional Platform Threads?',
          options: ['Virtual threads are lightweight, user-mode threads managed by the JVM that unmount from carrier threads during blocking I/O, allowing millions of concurrent tasks', 'Virtual threads execute in the GPU', 'Virtual threads do not support synchronized blocks', 'Platform threads have less memory overhead'],
          correctIndex: 0,
          explanation: 'Virtual threads are managed by the JVM rather than the OS kernel. When a virtual thread performs blocking I/O, it unmounts from its carrier platform thread, freeing it for other work.'
        },
        {
          id: 'jv_a_5',
          question: 'What is the purpose of `java.lang.invoke.VarHandle` introduced in Java 9?',
          options: ['A safe, strongly typed replacement for `sun.misc.Unsafe` providing atomic operations and precise memory access modes (acquire/release/opaque/volatile)', 'A wrapper around GUI sliders', 'A compiler plugin for Lombok', 'An XML parser utility'],
          correctIndex: 0,
          explanation: '`VarHandle` provides standard variable references with various memory fencing modes and atomic operations without resorting to dangerous `Unsafe` methods.'
        },
        {
          id: 'jv_a_6',
          question: 'What is Escaping Analysis in the HotSpot C2 JIT Compiler?',
          options: ['Determining if an object\'s reference escapes the current method or thread, enabling Scalar Replacement and Lock Coarsening/Elimination', 'Preventing SQL injection at runtime', 'Terminating runaway infinite loops', 'Detecting unhandled exceptions'],
          correctIndex: 0,
          explanation: 'If an object does not escape a method, HotSpot can decompose it into scalar primitives on the stack (Scalar Replacement), avoiding heap allocation entirely.'
        },
        {
          id: 'jv_a_7',
          question: 'What is the difference between `CompletableFuture.thenApply()` and `CompletableFuture.thenCompose()`?',
          options: ['thenApply transforms value with T -> U; thenCompose flattens an asynchronous pipeline where the transformation function itself returns a CompletableFuture<U>', 'thenApply is synchronous; thenCompose is multi-threaded', 'thenCompose is deprecated', 'thenApply is for error handling only'],
          correctIndex: 0,
          explanation: '`thenApply` is analogous to `map`, while `thenCompose` is analogous to `flatMap`, preventing nested `CompletableFuture<CompletableFuture<T>>`.'
        },
        {
          id: 'jv_a_8',
          question: 'What is ClassLoader delegation order in standard Java (parent-first model)?',
          options: ['Custom Loader -> App/System Loader -> Extension/Platform Loader -> Bootstrap Loader', 'Bootstrap Loader -> Platform/Extension Loader -> Application/System Loader', 'Random selection based on class name', 'Delegates directly to the disk filesystem first'],
          correctIndex: 1,
          explanation: 'Standard Java class loaders delegate requests to their parent loader first before attempting to find and load the class themselves.'
        },
        {
          id: 'jv_a_9',
          question: 'What is the ABA problem in lock-free programming (e.g., CAS operations), and how does `AtomicStampedReference` solve it?',
          options: ['A value changes from A to B and back to A, causing CAS to succeed erroneously; `AtomicStampedReference` pairs the reference with an integer stamp/version', 'Threads deadlock waiting for locks A and B', 'CPU cache invalidation storms', 'Buffer overflows in byte buffers'],
          correctIndex: 0,
          explanation: '`AtomicStampedReference` associates an integer version stamp with an object reference, ensuring that CAS fails if the stamp changed even if the reference matches.'
        },
        {
          id: 'jv_a_10',
          question: 'What does the Java module system (`module-info.java`) enforce that standard JARs on the classpath did not?',
          options: ['Strong encapsulation: non-exported packages cannot be accessed even via reflection without explicit `opens` directives', 'Mandatory 64-bit encryption', 'Direct compilation to native Windows binaries', 'Automatic multi-threading for all collections'],
          correctIndex: 0,
          explanation: 'JPMS (Java Platform Module System) enforces strong encapsulation at compile-time and runtime; internal packages cannot be accessed or reflected upon without explicit permissions.'
        }
      ],
      coding: [
        {
          id: 'jv_a_code_1',
          title: 'Design a Thread-Safe Bounded Blocking Queue',
          description: 'Implement a bounded blocking queue in Java with `put(E element)` and `take()` methods using `ReentrantLock` and `Condition` variables.',
          constraints: 'capacity >= 1, thread-safe without busy waiting',
          starterCode: `import java.util.concurrent.locks.*;

public class BoundedBlockingQueue<T> {
    private final Object[] items;
    private int count, head, tail;
    private final ReentrantLock lock = new ReentrantLock();
    private final Condition notFull = lock.newCondition();
    private final Condition notEmpty = lock.newCondition();

    public BoundedBlockingQueue(int capacity) {
        this.items = new Object[capacity];
    }

    public void put(T item) throws InterruptedException {
        // Write your put implementation here
    }

    @SuppressWarnings("unchecked")
    public T take() throws InterruptedException {
        // Write your take implementation here
        return null;
    }
}
`,
          sampleTestCases: [
            { input: 'Queue with capacity 2: put(1), put(2), take(), put(3)', expected: 'Correct FIFO sequence with blocking', explanation: 'Blocks when full, notifies when empty' }
          ],
          hiddenTestCases: [
            { input: 'Concurrent multi-producer multi-consumer execution', expected: 'No race conditions or lost updates' }
          ]
        },
        {
          id: 'jv_a_code_2',
          title: 'Lowest Common Ancestor in Binary Tree',
          description: 'Given a binary tree, find the lowest common ancestor (LCA) of two given nodes `p` and `q`. The LCA is defined as the lowest node in T that has both p and q as descendants.',
          constraints: 'All Node.val are unique. p != q. p and q will exist in the tree.',
          starterCode: `class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}

public class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        // Write your solution here
        return null;
    }
}
`,
          sampleTestCases: [
            { input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1', expected: '3', explanation: 'LCA of 5 and 1 is 3' }
          ],
          hiddenTestCases: [
            { input: 'root = [3,5,1], p = 5, q = 4', expected: '5' }
          ]
        }
      ],
      teaching: [
        {
          id: 'jv_a_teach_1',
          prompt: 'A team of enterprise Java developers is experiencing frequent "Stop the World" Garbage Collection pauses and high memory consumption under peak traffic. How would you teach them to diagnose whether the issue is Young Gen sizing, Old Gen memory leaks, or finalizer overhead using JVM flags (`-Xlog:gc*`, JFR, and VisualVM/JMC)?',
          guidance: 'Look for structured diagnostics: enabling unified GC logging (-Xlog:gc*), recording with Java Flight Recorder (JFR), analyzing object allocation rates vs survivor spaces, identifying uncollected static collections, and tuning GC collectors (G1GC / ZGC).'
        },
        {
          id: 'jv_a_teach_2',
          prompt: 'How would you mentor a senior engineer who is deciding between traditional Thread Pools (`ExecutorService`) and Virtual Threads (`Thread.ofVirtual()`) in a newly designed Spring Boot microservice? What are the architectural trade-offs, limitations (e.g. synchronized block carrier pinning), and best practices?',
          guidance: 'Look for carrier thread pinning explanation (avoiding synchronized / preferring ReentrantLock), why pooling virtual threads is an anti-pattern (they are cheap), handling ThreadLocals, and appropriate fit for I/O-bound vs CPU-bound tasks.'
        }
      ]
    }
  }
};
