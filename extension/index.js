chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
    var bookmarksContainer = document.getElementById('bookmarks');
    displayBookmarks(bookmarkTreeNodes[0].children[0].children, bookmarksContainer);
});

function displayBookmarks(bookmarkNodes, bookmarksContainer) {
    bookmarkNodes.forEach(function(node) {
        if (node.url) {
            var bookmarkItem = document.createElement('div');
            bookmarkItem.classList.add('bookmark-item');
            var link = document.createElement('a');
            link.href = node.url;
            link.textContent = node.title;
            bookmarkItem.appendChild(link);
            bookmarksContainer.appendChild(bookmarkItem);
        } else if (node.children) {
            var folderItem = document.createElement('button');
            folderItem.textContent = node.title;
            folderItem.classList.add('folder');
            bookmarksContainer.appendChild(folderItem);
            folderItem.addEventListener('click', function() {
                toggleFolderContents(folderItem);
            });
            var folderContents = document.createElement('div');
            folderContents.classList.add('folder-contents');
            folderItem.appendChild(folderContents);
            displayBookmarks(node.children, folderContents);
        }
    });
}

function toggleFolderContents(folderItem) {
    var folderContents = folderItem.querySelector('.folder-contents');
    folderContents.classList.toggle('open');
}
