window.addEventListener('load', () => {
  const data = [];
  let dragEl = null;
  let dragIds = {
    source: null,
    target: null
  }
  
  for (i = 1; i <= 10; i++) {
    data.push({
      id: i + '',
      text: `This is item ${i}. Drag to reorder`
    });
  }
  
  const reorderData = () => {
    // const cloneData = [...data]; // This is shallow clone. Might now work properly for nested data
    const sourceIndex = data.findIndex(item => item.id === dragIds.source);
    const targetIndex = data.findIndex(item => item.id === dragIds.target);
    const removedItems = data.splice(sourceIndex, 1); // Modifies data array and returns the removed element
    data.splice(targetIndex, 0, removedItems[0]); // since there would be only 1 item removed
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
    }
  };
  
  const onDragEnd = (event) => {
    dragEl.classList.remove('ghost');
    reorderData();
  };
  
  const dndContainer = document.querySelector('#dragndrop-container');
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