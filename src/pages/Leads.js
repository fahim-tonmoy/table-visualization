import React, { useEffect, useState } from 'react';
import LeadsTable from '../components/LeadsTable';
import { API } from '../utils/config';
// import moment from 'moment/moment';

const Leads = () => {
    const [data, setData] = useState([]); 
	const [filterText, setFilterText] = useState("");
	const [filteredStatus , setFilteredStatus] = useState(null);
	const [filterDate , setFilterDate] = useState([]);
	const [filteredSource, setFilteredSource] = useState(null);
	const [filteredAssignees, setFilteredAssignees] = useState(null);
	const [dataFetchingStatus, setDataFetchingStatus] = useState(false);

    const formData = {
        search: filterText,
        lead_status_id: filteredStatus ? [filteredStatus.value] : [],
        source_id: filteredSource ? [filteredSource.value] : [],
        user_id: filteredAssignees ? [filteredAssignees.value] : [],
        contacted_date_from: "",
        contacted_date_to: ""
        // contacted_date_from: filterDate?.length ? moment(filterDate[0]).format() : '',
        // contacted_date_to: filterDate?.length ? moment(filterDate[1]).format() : ''
    }

    useEffect(()=>{
        setDataFetchingStatus(true)
        API.post('admin/lead/list?page=1&limit=100').then((res)=>{
            setData(res?.data?.data?.data)
            setDataFetchingStatus(false)
        })
    },[])

    const handleFilter = (isClear) => {
        const data = !isClear ? formData : {} ;
        setDataFetchingStatus(true) 
        API.post('admin/lead/list?page=1&limit=100',data).then((res)=>{
            setData(res?.data?.data?.data)
            setDataFetchingStatus(false) 
        })
    }


    return (
        <div className='leads-data-table'>
            <LeadsTable 
                data={data}
                handleFilter={handleFilter}
                filterText={filterText}
                setFilterText={setFilterText}
                filterDate={filterDate}
                setFilterDate={setFilterDate}
                filteredStatus={filteredStatus}
                filteredSource={filteredSource}
                filteredAssignees={filteredAssignees}
                setFilteredStatus={setFilteredStatus}
                setFilteredSource={setFilteredSource}
                dataFetchingStatus={dataFetchingStatus}
                setFilteredAssignees={setFilteredAssignees}
            />
        </div>
    );
};

export default Leads;