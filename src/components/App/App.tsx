import css from "./App.module.css"

import { fetchNotes } from "../../services/noteService"
import {useQuery, keepPreviousData} from '@tanstack/react-query'
import { useState } from "react"
import { useDebounce } from "use-debounce"

import Modal from "../Modal/Modal"
import Loader from "../Loader/Loader"
import Pagination from "../Pagination/Pagination"
import NoteList from "../NoteList/NoteList"
import SearchBox from "../SearchBox/SearchBox"
import ErrorMessage  from "../ErrorMessage/ErrorMessage"
import NothingHereMessage from "../NothingHereMessage/NothingHereMessage"


function App() {
    
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [modalIsOpen, setModalIsOpen] = useState(false)


    const [debouncedSearch] = useDebounce(search, 500);



        const { data, isLoading, isError } = useQuery({
        queryKey: ['notes', page, debouncedSearch],
            queryFn: () => fetchNotes({ page, search: debouncedSearch }),
            placeholderData: keepPreviousData,
    })

    

    
    return (
        <div className={css.app}>
	<header className={css.toolbar}>
		<SearchBox value={search} onChange={setSearch} />
                <Pagination totalPages={data?.totalPages ?? 1} page={page} onPageChange={ setPage } />
		<button className={css.button} onClick={()=> setModalIsOpen(true)}>Create note +</button>

            </header>
            {isLoading ? <Loader /> : null}
            {isError ? <ErrorMessage /> : null}
            { !isError && !isLoading && data && data.notes.length === 0 && <NothingHereMessage />}
            <NoteList notes={data?.notes} />
            { modalIsOpen && <Modal onClose={() => setModalIsOpen(false)} />}
</div>

    )
}



export default App