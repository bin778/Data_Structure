class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    // 인수로 전달된 값으로 새 노드를 만든다.
    const newNode = new Node(val);
    // 길이가 0이면, 새 노드를 head와 tail로 정한다.
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
      // 길이가 0이 아니라면, tail의 next 포인터가 새 노드를 가리키게 하고,
      // 새 노드의 prev 포인터는 tail을 가리키게 하고,
      // 마지막으로 tail은 이제 새 노드가 되도록 지정한다.
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  pop() {
    // 만약 head가 없으면(=길이가 0이면) undefined를 반환한다.
    if (!this.head) return undefined;
    // poppedNode 변수가 tail을 가리키게 한다.
    const poppedNode = this.tail;
    // 길이가 1이면, head와 tail 모두 null이 된다.(pop됐으니)
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      // 길이가 2이상이면, poppedNode의 prev(마지막에서 두 번째) 노드가 tail이 되도록 하고,
      // tail의 next 포인터는 null로 재할당하고,
      // poppedNode의 prev 포인터도 null로 재할당하여 연결을 끊는다.
    } else {
      this.tail = poppedNode.prev;
      this.tail.next = null;
      poppedNode.prev = null;
    }
    this.length--;
    return poppedNode;
  }

  shift() {
    // 길이가 0이면, undefined를 반환한다.
    if (this.length === 0) return undefined;
    // oldHead 변수가 head를 가리키게 한다.
    const oldHead = this.head;
    // 길이가 1이면, shift될 경우 길이가 0이 되므로 head와 tail에 모두 null을 할당한다.
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      // 길이가 2이상 이면, oldHead의 next(앞에서 두 번째) 노드가 head가 되도록 하고,
      // head의 prev 포인터는 null로 재할당하고,
      // oldHead의 next 포인터도 null로 재할당하여 연결을 끊는다.
    } else {
      this.head = oldHead.next;
      this.head.prev = null;
      oldHead.next = null;
    }
    this.length--;
    return oldHead;
  }

  unshift(val) {
    // 인수로 받은 val로 새 노드를 만든다.
    const newNode = new Node(val);
    // 길이가 0이면, head와 tail에 모두 새 노드를 할당한다.
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
      // 길이가 1 이상 이면, head의 prev 포인터가 새로 추가된 노드를 가리키게 하고,
      // 새 노드의 nex 포인터는 head를 가리키게 하고,
      // 이제 새 노드가 head가 되도록 만든다.
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  // get 메서드: 연결 리스트 위치를 통해 노드를 반환받는다.
  get(index) {
    // 입력된 인덱스가 유효한지 체크한다.
    if (index < 0 || index >= this.length) return null;
    let count; // 루프를 돌면서 인덱스를 카운팅한다.
    let current; // current 변수를 나중에 return한다.
    // 입력된 인덱스가 리스트의 앞 부분에 있으면
    if (index <= this.length / 2) {
      count = 0;
      current = this.head;
      // head부터 시작해서 정방향으로 루프를 돈다.
      while (count !== index) {
        current = current.next;
        count++;
      }
      // 입력된 인덱스가 리스트의 뒤 부분에 있으면,
    } else {
      count = this.length - 1;
      current = this.tail;
      // tail부터 시작해서 역방향으로 루프를 돈다.
      while (count !== index) {
        current = current.prev;
        count--;
      }
    }
    return current;
  }

  // set 메서드: 연결 리스트에서 특정 위치의 노드의 값을 변경한다.
  set(index, val) {
    // get 메서드를 사용하여 foundNode가 해당 인덱스의 노드를 가리키도록 한다.
    const foundNode = this.get(index);
    // 입력된 값을 foundNode의 val에 재할당하고 true를 반환한다.
    if (foundNode != null) {
      foundNode.val = val;
      return true;
    }
    return false;
  }

  // insert 메서드: 연결 리스트에서 특정 위치에 있는 노드를 삽입한다.
  insert(index, val) {
    // 입력된 인덱스가 유효한지 체크한다.
    if (index < 0 || index > this.length) return false;
    // 입력된 인덱스가 길이와 같다면, push 메서드 사용하고 형 변환을 통해 true를 반환한다.
    if (index === this.length) return !!this.push(val);
    // 입력된 인덱스가 0이라면, unshift 메서드 사용하고 형 변환을 통해 true를 반환한다.
    if (index === 0) return !!this.unshift(val);

    const newNode = new Node(val);
    // 새로 삽입될 노드의 이전에 위치할 노드는 get 메서드를 사용해서 index-1 노드를 가져오고, 새로 삽입될 노드의 다음에 위치할 노드는 beforeNode의 next를 통해 가져온다.
    const beforeNode = this.get(index - 1);
    const afterNode = beforeNode.next;

    // beforeNode의 next 포인터가 새 노드를 가리키게 하고, 새 노드의 prev 포인터는 beforeNode를 가리키게 한다.
    (beforeNode.next = newNode), (newNode.prev = beforeNode);
    // 새 노드의 next 포인터가 afterNode를 가리키게 하고, afterNode의 prev 포인터는 새 노드를 가리키게 한다.
    (newNode.next = afterNode), (afterNode.prev = newNode);
    this.length++;
    return true;
  }

  // remove 메서드: 연결 리스트에서 특정 위치에 있는 노드를 삭제한다.
  remove(index) {
    // 입력된 인덱스가 유효한지 체크한다.
    if (index < 0 || index > this.length) return undefined;
    // 입력된 인덱스가 0이면 shift 메서드를 사용한다.
    if (index === 0) return this.shift();
    // 입력된 인덱스가 끝 인덱스와 같다면 pop 메서드를 사용한다.
    if (index === this.length - 1) return this.pop();

    // 삭제할 노드의 인덱스를 탐색한다.
    const removedNode = this.get(index);
    // 삭제할 노드의 이전 노드의 next 포인터가 삭제할 노드의 next 노드를 가리키게 한다.
    removedNode.prev.next = removedNode.next;
    // 삭제할 노드의 다음 노드의 prev 포인터가 삭제할 노드의 prev 노드를 가리키게 한다.
    removedNode.next.prev = removedNode.prev;

    // 삭제할 노드의 next 포인터와 prev 포인터를 모두 null로 재할당하여, 연결을 끊는다.
    removedNode.next = null;
    removedNode.prev = null;
    this.length--;
    return removedNode;
  }

  // reverse 메서드: 연결 리스트의 head와 tail을 바꾸고, 모든 노드의 next 포인터와 prev 포인터 방향을 뒤집음로써, 리스트 자체는 뒤집는다.
  reverse() {
    // 반복문에서 사용할 node를 저장한다.
    let node = this.head;
    // head와 tail을 바꾼다.
    this.head = this.tail;
    this.tail = node;

    // next 포인터 방향 뒤집기
    let next; // 임시 저장 변수
    let prev = null; // 첫 번째로 뒤집히는 node(tail이 되므로)의 next는 null이다.
    for (let i = 0; i < this.length; i++) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }

    // prev 포인터 방향 뒤집기 (위에서 head와 tail이 뒤집혔으므로 this.head는 사실상 원래 tail이었다)
    // 첫 번째로 뒤집히는 node(head가 되므로)의 prev는 null이다.
    next = null;
    // 반복문에서 사용할 tail node를 저장한다
    node = this.head;
    for (let i = 0; i < this.length; i++) {
      prev = node.prev;
      node.prev = next;
      next = node;
      node = prev;
    }
  }
}
      }
    }
  }
</script>
