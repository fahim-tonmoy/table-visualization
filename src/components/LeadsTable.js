import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { API, BASE_URL } from '../utils/config';
import Search from './Fields/search';
import ReactSelect from './Fields/select';
import DateRange from './Fields/DateRangePicker';

const LeadsTable = ({
    data, 
    handleFilter,
    filterText,
    filterDate,
    setFilterDate, 
    setFilterText, 
    filteredStatus, 
    setFilteredStatus, 
    filteredSource, 
    setFilteredSource, 
    filteredAssignees, 
    setFilteredAssignees,
    dataFetchingStatus
}) => {
    const [status, setStatus] = useState([]);
    const [assignee, setAssignee] = useState([]);
    const [source, setSource] = useState([]);

    const filteredStatusOptions = status.reduce((acc, current) => {
        let currentItem = {
            label: current.name,
            value: current.id,
        }
        acc.push(currentItem)
        return acc;
    }, [])
    
    const filteredSourceOptions = source.reduce((acc, current) => {
        let currentItem = {
            label: current.name,
            value: current.id,
        }
        acc.push(currentItem)
        return acc;
    }, [])

    const filteredAssigneesOptions = assignee.reduce((acc, current) => {
        let currentItem = {
            label: current.name,
            value: current.user_id,
        }
        acc.push(currentItem)
        return acc;
    }, [])

    const handleReset = () => {
            setFilterText("");
            setFilteredAssignees(null);
            setFilteredSource(null);
            setFilteredStatus(null);
            setFilterDate([]);
            handleFilter(true);
    }


    useEffect(()=>{
        API.get("admin/base/source").then(res => {
            setSource(res.data.data)
        })
        API.get("admin/base/lead-status").then(res => {
            setStatus(res.data.data)
        })
        API.get("admin/base/assignee").then(res => {
            setAssignee(res.data.data)
        })
    },[])

    const columns = [
        {
            name: 'Lead Name',
            sortable: true,
            cell: (row) => {
                return (
                    <div className="">                        
                        {row?.name}
                    </div>
                );
            },
        },
        {
            name: 'Phone',
            cell: (row) => {
                return (
                    <div className="">                        
                        {row?.phone}
                    </div>
                );
            },
        },
        {
            name: 'Followup Date',
            cell: (row) => {
                return (
                    <div className="">                        
                        {row?.followup_date ? row?.followup_date : "-" }
                    </div>
                );
            },
        },
        {
            name: 'Last note',
            cell: (row) => {
                return (
                    <div>                        
                        {row?.lead_notes.length > 0 ? (
                            <>
                                {row?.lead_notes.map((item, index) => (
                                    <p key={index}>{item} {row?.lead_notes.length - 1 > index
                                        ? ', '
                                        : ''
                                    }</p>
                                ))}
                            </>
                            ) : (
                                <p>No notes created!</p>
                            )
                        }
                    </div>
                );
            },
        },
        {
            name: 'Assigned',
            cell: (row) => {
                return (
                    <div className="lead-assigns">                        
                        {row?.lead_assignees.length > 0 ? (
                            <>
                                {row?.lead_assignees.map((item,index) => {
                                    return (
                                    <img
                                        className='lead-assign'
                                        src={`${BASE_URL}${item.image}`} 
                                        key={index}
                                        alt={item.name} 
                                    />
                                )})}
                            </>
                        ) : (
                            <p>-</p>
                        )}
                    </div>
                );
            },
        },
        {
            name: 'Email',
            cell: (row) => {
                return (
                    <div className="">                        
                        {row?.email}
                    </div>
                );
            },
        },
        {
            name: 'Preferred Country',
            cell: (row) => {
                return (
                    <div>                        
                        {row?.lead_preferred_countries.length > 0 ? (
                            <>
                                {row?.lead_preferred_countries.map((item, index) => (
                                    <p key={index}>{item?.name} {row?.lead_preferred_countries.length - 1 > index
                                        ? ', '
                                        : ''
                                    }</p>
                                ))}
                            </>
                            ) : (
                                <p>-</p>
                            )
                        }
                    </div>
                );
            },
        },
        {
            name: 'Status',
            cell: (row) => {
                return (
                    <p style={{color: row.lead_status?.color}}>{row.lead_status.name}</p>
                );
            },
        },
        {
            name: 'Source',
            cell: (row) => {
                return (
                    <div className="">                        
                        <p>{row.source.name}</p>
                    </div>
                );
            },
        },
        {
            name: 'Actions',
            cell: (row) => {
                return (
                    <div className="table-action-controls">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
                    </span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                    </span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                    </span>                        
                    </div>
                );
            },
        },
    ]

    const subHeaderComponentMemo = React.useMemo(() => {

		return (
			<div className='table-topbar'>
				<Search
					placeholder='Search Leads'
					value={filterText}
					onChangeHandler={(e) => setFilterText(e.target.value)}
				/>
                <ReactSelect
                    name="filter_by_status"
                    placeholder="Status"
                    options={filteredStatusOptions} 
                    value={filteredStatus}
                    setFieldValue={setFilteredStatus}
                />
                <ReactSelect
                    name="filter_by_source"
                    placeholder="Source"
                    value={filteredSource}
                    options={filteredSourceOptions} 
                    setFieldValue={setFilteredSource}
                />
                <ReactSelect
                    name="filter_by_assignees"
                    placeholder="Assignees"
                    value={filteredAssignees}
                    options={filteredAssigneesOptions} 
                    setFieldValue={setFilteredAssignees}
                />
                <DateRange setFieldValue={setFilterDate} />
                <button 
                    className='filter-reset-btn'
                    type='button'
                    onClick={()=> handleFilter(false)}
                >Filter</button>
                <button 
                    className='filter-reset-btn'
                    type='button'
                    onClick={handleReset}
                >Reset Filter</button>
			</div>
		);
	}, [filterText, filteredAssigneesOptions, filteredSourceOptions, filteredStatusOptions, filteredStatus, filterDate]);

    return (
        <DataTable
			title=""
			columns={columns}
			data={data}
			pagination
			subHeader
			subHeaderComponent={subHeaderComponentMemo}
			selectableRows
			persistTableHead
            fixedHeader={true}
            fixedHeaderScrollHeight="800px"
			progressPending={dataFetchingStatus}
		/>
    );
};

export default LeadsTable;