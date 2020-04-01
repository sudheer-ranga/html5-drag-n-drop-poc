window.addEventListener('load', () => {
  const data = [];
  const dndContainer = document.querySelector('#dragndrop-container');
  let dragEl = null;
  let dragIds = {
    source: null,
    target: null,
    direction: null
  };
  
  for (i = 1; i <= 10; i++) {
    data.push({
      id: i + '',
      text: `This is item ${i}. Drag to reorder`
    });
  }
  
  const initialDataContainer = document.querySelector('#initial-data');
  const updatedDataContainer = document.querySelector('#updated-data');
  
  initialDataContainer.innerHTML = `<pre>${JSON.stringify(data, undefined, 2)}</pre>`;
  updatedDataContainer.innerHTML = `<pre>${JSON.stringify(data, undefined, 2)}</pre>`;
  
  const reorderData = () => {
    // const cloneData = [...data]; // This is shallow clone. Might now work properly for nested data
    const sourceIndex = data.findIndex(item => item.id === dragIds.source);
    const removedItems = data.splice(sourceIndex, 1); // Modifies data array and returns the removed element
    const targetIndex = data.findIndex(item => item.id === dragIds.target); // removing items and getting target index order is important. don't change
    
    if (dragIds.direction === 'DRAG_TOP_TO_BOTTOM') {
      data.splice(targetIndex + 1, 0, removedItems[0]); // since there would be only 1 item removed. getting [0]th item
    } else { // bottom to top
      data.splice(targetIndex, 0, removedItems[0]);
    }
    
    updatedDataContainer.innerHTML = `<pre>${JSON.stringify(data, undefined, 2)}</pre>`;
    console.log(data);
  };
  
  const onDragStart = (event) => {
    dragEl = event.target;

    event.dataTransfer.effectAllowed = 'move';
    setTimeout(function () {
      dragEl.classList.add('ghost');
    }, 0);
  };
  
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const isHalf = (event.clientY - rect.top) / (rect.bottom - rect.top) > .5;
    
    if (target && target !== dragEl) {
      if (isHalf) {
        dndContainer.insertBefore(dragEl, target);
      } else {
        dndContainer.insertBefore(target, dragEl);
      }
      
      dragIds.source = dragEl.id;
      dragIds.target = target.id;
      dragIds.direction = isHalf ? 'DRAG_BOTTOM_TO_TOP' : 'DRAG_TOP_TO_BOTTOM';
    }
  };
  
  const onDragEnd = (event) => {
    dragEl.classList.remove('ghost');
    reorderData();
  };
  
  data.forEach((item) => {
    var node = document.createElement('p');
    var textnode = document.createTextNode(item.text);
    node.appendChild(textnode);
    node.classList.add('block');
    node.setAttribute('draggable', 'true');
    node.setAttribute('id', item.id);

    node.addEventListener('dragstart', onDragStart);
    node.addEventListener('dragover', onDragOver);
    node.addEventListener('dragend', onDragEnd);
    
    dndContainer.appendChild(node);
  });
});