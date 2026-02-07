export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: Rule => Rule.required() },
    {
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    },
    { name: 'metaDescription', type: 'text' },
    { name: 'mainImage', type: 'image', options: { hotspot: true } },
    {
      name: 'category',
      type: 'string',
      options: {
        list: [
          { title: 'Personal Loan', value: 'Personal Loan' },
          { title: 'Business Loan', value: 'Business Loan' },
          { title: 'Vehicle Loan', value: 'Vehicle Loan' },
          { title: 'Credit Score', value: 'Credit Score' },
        ],
      },
    },
    { name: 'author', type: 'string', initialValue: 'EzyLoan Team' },
    { name: 'publishDate', type: 'datetime' },
    {
      name: 'content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    },
  ],
};
