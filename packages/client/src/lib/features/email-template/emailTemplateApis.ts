'use client'
import api from "@/lib/api";

export const emailTemplateAPIs = api.injectEndpoints({
  endpoints: (builder) => ({
    getEmailTemplates: builder.query({
      query: (queryParams) => ({
        url: "/email-template",
        method: "GET",
        params: queryParams,
      }),
    }),

    getAnEmailTemplate: builder.query({
      query: ({ project_id, template_id }) => ({
        url: `/email-template/${template_id}`,
        method: "GET",
        params: { project_id },
      }),
    }),

    searchForTemplate: builder.query({
      query: (query) => ({
        url: `/email-template/search`,
        method: "GET",
        params: { search : query },
      }),
    }),

    createNewTemplate: builder.mutation({
      query: (body) => ({
        url: "/email-template",
        method: "POST",
        body: body,
      }),
    }),

    updateTemplate : builder.mutation({ 
      query : (body) => ( { 
        url : '/email-template', 
        method : "PUT", 
        body : body
      })
    })
  }),
});

export const {
  useGetAnEmailTemplateQuery,
  useGetEmailTemplatesQuery,
  useSearchForTemplateQuery,
  useCreateNewTemplateMutation,
  useUpdateTemplateMutation,
} = emailTemplateAPIs;
