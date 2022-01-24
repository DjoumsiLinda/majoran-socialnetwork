import "../css/FindPeople.css";
import { useEffect, useState } from "react";

export default function FindPeople() {
    const [people, setPeople] = useState("");
    const [peoples, setPeoples] = useState([]);
    const [loadMore, setLoadMore] = useState(false);

    useEffect(() => {
        if (!people) {
            setPeoples([]);
            return;
        }
        // handling out-of-order responses
        let ignore = false;
        fetch(`findPeople.json/find?after=${people}`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return [];
                }
            })
            .then((data) => {
                // only save data in state if ignore is false
                if (!ignore) {
                    setPeoples(data);
                    checkLoadMore(data);
                }
                // if ignore is true we just ignore the response
            });

        // cleanup function:
        // react will run the cleanup function in between useEffect runs
        return () => {
            ignore = true;
        };
    }, [people]);
    function checkLoadMore(data) {
        if (!data[data.length - 1].id) {
            return;
        }
        for (const i in data) {
            if (data[i].id === data[i].lowestid) {
                setLoadMore(false);
                return;
            } else {
                setLoadMore(true);
            }
        }
    }

    function handleClick() {
        const lastId = suchLastId(peoples);

        fetch(`findPeople.json/more?id=${lastId}&val=${people}`)
            .then((res) => {
                return res.json();
            })
            .then((nextPeoples) => {
                setPeoples([...peoples, ...nextPeoples]);
                checkLoadMore(peoples);
                console.log(peoples);
            });
    }

    return (
        <div className="findPeople">
            <div id="contains">
                <h2>Find People</h2>
                <input
                    type="text"
                    name="people"
                    value={people}
                    onChange={(e) => setPeople(e.target.value)}
                />
                {peoples && (
                    <ul>
                        {peoples.first} {peoples.last}
                        {peoples.map((users) => {
                            return (
                                <div key={users.id} id="people">
                                    <img
                                        src={
                                            users.url || "/assets/default.jpeg"
                                        }
                                    />
                                    <div id="cen">
                                        <p>
                                            {users.first} {users.last}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </ul>
                )}
            </div>
            <div>
                {loadMore && (
                    <button onClick={handleClick} id="more">
                        More
                    </button>
                )}
            </div>
        </div>
    );
}
function suchLastId(peoples) {
    let id = peoples[0].id;
    for (const i in peoples) {
        if (peoples[i].id < id) {
            id = peoples[i].id;
        }
    }
    return id;
}
