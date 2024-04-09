Temporary Notes Location Until Sync with Obsidian 

## What are Server Actions? 
React Server Actions allow you to run asynchronous code directly on the server. 
- They eliminate the need to create API endpoints to mutate your data. 
- Instead, you write async functions that execute on teh server and can invoked from your Client or Server Components 


### Using forms with Server Actions 
You can use the `action` attribute in the `<form>` element to invoke actions. 
- The action will automatically receive the native FormData object, containing the captured data

Server Actions are also deeply integrated with Next.js caching. 
- When a form is submitted through a Server Action, not only can you use the action to mutate the data, but you can also revalidate teh associated cache using APIs like `revalidatePath` and `revalidateTag`

## Creating an invoice 
Here are the steps we'll take to create a new invoice: 
1. Create a form to capture the user's input 
2. Create a Server Action and invoke it from the form
3. Inside your Server Action, extract the data from the `formData` object
4. Validate and prepare the data to be inserted into the DB
5. Insert the data and handle any errors
6. Revalidate the cache and redirect the user back to invoices page 


Tip: If you're working with forms that have many fields, you may want to consider using the entries() method with JavaScript's Object.fromEntries(). For example:

const rawFormData = Object.fromEntries(formData.entries())


### Type validation and coercion
It's important to validate that the data from your form aligns with the expected types in your database. For instance, if you add a console.log inside your action:


console.log(typeof rawFormData.amount);
You'll notice that amount is of type string and not number. This is because input elements with type="number" actually return a string, not a number!

To handle type validation, you have a few options. While you can manually validate types, using a type validation library can save you time and effort. For your example, we'll use Zod, a TypeScript-first validation library that can simplify this task for you.

In your actions.ts file, import Zod and define a schema that matches the shape of your form object. This schema will validate the formData before saving it to a database


### Revalidate and redirect

Next.js has a Client-side Router Cache that stores the route segments in the user's browser for a time. Along with prefetching, this cache ensures that users can quickly navigate between routes while reducing the number of requests made to the server. 

Since we're updating the data displayed in the invoices route (adding a new invoice), we'll want to clear this cache and trigger a new request to the server. This is done with the `revalidatePath` function 

## Updating an invoice 
These are the steps we'll take to update an invoice: 
1. Create a dynamic route segment with the invoice `id` 
2. Read the invoice `id` from the page params 
3. Fetch the specific invoice from your database 
4. Pre-populate the form with the invoice data 
5. Update the invoice data in your database 

**You can create dynamic route segments by wrapping a folder's name in square brackets**


