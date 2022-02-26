const PostUseCaseSpyList = async (page, size) => {
  if (page === 1 && size === 5) {
    const result = {
      data: [
        {
          _id: '1abd41bd-d77a-4de1-8a40-1ddddfeb489a',
          title: 'Title one',
          body: 'Description body one',
          tags: ['tagOne', 'tagTwo', 'tagThree']
        },
        {
          _id: 'e02c72cf-8d46-4a6b-8d1e-eba7b5d619bc',
          title: 'Title tow',
          body: 'Description body tow',
          tags: ['tagOne', 'tagTwo', 'tagThree']
        },
        {
          _id: '237e167d-b95c-46bf-9acc-38dc1ca9b9f9',
          title: 'Title three',
          body: 'Description body three',
          tags: ['tagOne', 'tagTwo', 'tagThree']
        },
        {
          _id: '1ddc583a-1d86-4298-8926-04a49c603c99',
          title: 'Title four',
          body: 'Description body four',
          tags: ['tagOne', 'tagTwo', 'tagThree']
        },
        {
          _id: '50d25b54-f9a9-4e3e-b9a1-6a2ba373fab2',
          title: 'Title five',
          body: 'Description body five',
          tags: ['tagOne', 'tagTwo', 'tagThree']
        }
      ],
      total: 5,
      limit: 5,
      offset: 0
    }
    return await result.data[0]
  } else {
    return await null
  }
}

module.exports = PostUseCaseSpyList
