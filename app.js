window.addEventListener('load', () => {
  const dndContainer = document.querySelector('#dragndrop-container');
  const blocks = document.querySelectorAll('#dragndrop-container .block');
  let dragEl = null;
  
  const onDragStart = (event) => {
    dragEl = event.target;

    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text', dragEl);
    setTimeout(function () {
      dragEl.classList.add('ghost');
    }, 0)
  };
  
  // const onDrag = (event) => {
  // };
  
  const onDragEnd = (event) => {
    dragEl.classList.remove('ghost');
  };
  
  // const onDragEnter = (event) => {
  // };
  
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const next = (event.clientY - rect.top)/(rect.bottom - rect.top) > .5;
    
    if (target && target !== dragEl) {
      if (next) {
        dndContainer.insertBefore(dragEl, target);
      } else {
        dndContainer.insertBefore(target, dragEl);
      }
    }
  };
  
//   const onDragLeave = (event) => {
//   };
  
//   const onDrop = (event) => {
//   };
  
  blocks.forEach((block) => {
    block.setAttribute('draggable', 'true');
    block.addEventListener('dragstart', onDragStart);
    // block.addEventListener('drag', onDrag);
    block.addEventListener('dragend', onDragEnd);
    // block.addEventListener('dragenter', onDragEnter);
    block.addEventListener('dragover', onDragOver);
    // block.addEventListener('dragleave', onDragLeave);
    // block.addEventListener('drop', onDrop);
  });
})