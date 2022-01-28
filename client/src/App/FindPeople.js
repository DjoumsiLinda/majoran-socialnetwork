import "../css/FindPeople.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [people, setPeople] = useState("");
    const [peoples, setPeoples] = useState([]);
    const [loadMore, setLoadMore] = useState(false);

    //When you call useEffect, you pass it a function.
    //The function that you pass will be called immediately after your component has been rendered.
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
                }
                // if ignore is true we just ignore the response
            });

        // cleanup function:
        // react will run the cleanup function in between useEffect runs
        return () => {
            ignore = true;
        };
    }, [people]);

    useEffect(
        function checkLoadMore() {
            if (peoples.length === 0 || !peoples[peoples.length - 1].id) {
                return;
            }
            for (const i in peoples) {
                if (peoples[i].id === peoples[i].lowestid) {
                    setLoadMore(false);
                    return;
                } else {
                    setLoadMore(true);
                }
            }
        },
        [peoples]
    );

    function handleClick() {
        const lastId = suchLastId(peoples);

        fetch(`findPeople.json/more?id=${lastId}&val=${people}`)
            .then((res) => {
                return res.json();
            })
            .then((nextPeoples) => {
                setPeoples([...peoples, ...nextPeoples]);
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
                {people && peoples.length === 0 && <p>not found</p>}
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
                                        onError={(evt) => {
                                            evt.target.src =
                                                "/assets/default.jpeg";
                                        }}
                                    />
                                    <div id="cen">
                                        <p>
                                            {users.first} {users.last}
                                        </p>
                                        <Link
                                            to={`/user/${users.id}`}
                                            id="link"
                                        >
                                            See More
                                        </Link>
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
