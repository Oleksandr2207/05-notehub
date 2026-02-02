import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";

const schema = Yup.object({
  title: Yup.string().min(3).max(50).required(),
  content: Yup.string().max(500),
  tag: Yup.string().oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"]).required(),
});

export default function NoteForm({ onClose }) {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  return (
    <Formik
      initialValues={{ title: "", content: "", tag: "Todo" }}
      validationSchema={schema}
      onSubmit={(values) => mutation.mutate(values)}
    >
      <Form className="form">
        <div>
          <label>Title</label>
          <Field name="title" />
          <ErrorMessage name="title" component="span" />
        </div>

        <div>
          <label>Content</label>
          <Field as="textarea" name="content" rows={8} />
          <ErrorMessage name="content" component="span" />
        </div>

        <div>
          <label>Tag</label>
          <Field as="select" name="tag">
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" />
        </div>

        <button type="button" onClick={onClose}>Cancel</button>
        <button type="submit" disabled={mutation.isPending}>
          Create note
        </button>
      </Form>
    </Formik>
  );
}
