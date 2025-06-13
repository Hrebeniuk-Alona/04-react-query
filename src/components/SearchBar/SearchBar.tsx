import css from '../SearchBar/Search.Bar.module.css'
import { Formik, Form, Field, FormikHelpers } from "formik";
import toast from 'react-hot-toast'

interface SearchBarProps{
    onSubmit: (query: string) => void;
}

interface FormValue{
    query: string;
}

const initialValues: FormValue = {
    query: "",
}

const notifyError = () => toast('Please enter your search query.');


export default function SearchBar({ onSubmit }: SearchBarProps) {
    const handleSubmit = (
        values: FormValue,
        actions: FormikHelpers <FormValue>
    ) => {

        if (values.query.trim() === "") {
            notifyError();
            return;
        }


        onSubmit(values.query);
        actions.resetForm();
    }



    return (
        <header className={css.header}>
    <div className={css.container}>
        <a
            className={css.link}
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
        >
            Powered by TMDB
                </a>
                <Formik
                    initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className={css.form}>
            <Field
                className={css.input}
                type="text"
                name="query"
                autoComplete="off"
                placeholder="Search movies..."
                autoFocus
            />
            <button className={css.button} type="submit">
                Search
            </button>
            </Form>
        </Formik>
    </div>
</header>
    )
}


