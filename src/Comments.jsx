import React from "react";
import iconreply from "./assets/icon-reply.svg";
import iconedit from "./assets/icon-edit.svg";
import icondel from "./assets/icon-delete.svg";
function Comments({ c, delcmnt, delrep }) {
  return (
    <>
      <div className="cmnt">
        <div className="cmnthead">
          <div className="name">
            <img src={c.user.image} alt="image not found" />
            <div className="username">
              <span>{c.user.username}</span>
              {c.user.username == "juliusomo" && (
                <span className="you">you</span>
              )}
              <p>{c.createdAt}</p>
            </div>
          </div>
          {c.user.username == "juliusomo" ? (
            <div>
              <button className="btndel" onClick={() => delcmnt(c.id)}>
                <img src={icondel} alt="logo not found" /> Delete
              </button>
              <button className="btnreply">
                <img src={iconedit} alt="logo not found" /> Edit
              </button>
            </div>
          ) : (
            <button className="btnreply">
              <img src={iconreply} alt="logo not found" /> Reply
            </button>
          )}
        </div>
        <div className="para">
          <p>{c.content}</p>
        </div>
      </div>
      {c.replies.length === 0 ? (
        <></>
      ) : (
        <div className="replies">
          <div className="line"></div>
          <div className="replydiv">
            {c.replies.map((r) => (
              <div className="reply" key={r.id}>
                <div className="cmnthead">
                  <div className="name">
                    <img src={r.user.image} alt="image not found" />
                    <div
                      className="username"
                      style={
                        r.user.username == "juliusomo" ? { gap: "6px" } : null
                      }
                    >
                      <span>{r.user.username}</span>
                      {r.user.username == "juliusomo" && (
                        <span className="you">you</span>
                      )}
                      <p>{r.createdAt}</p>
                    </div>
                  </div>
                  {r.user.username == "juliusomo" ? (
                    <div className="btnsuser">
                      <button
                        className="btndel"
                        onClick={() => delrep(c.id, r.id)}
                      >
                        <img src={icondel} alt="logo not found" /> Delete
                      </button>
                      <button className="btnreply">
                        <img src={iconedit} alt="logo not found" /> Edit
                      </button>
                    </div>
                  ) : (
                    <button className="btnreply">
                      <img src={iconreply} alt="logo not found" /> Reply
                    </button>
                  )}
                </div>
                <div className="para">
                  <p>
                    <span>@{r.replyingTo}</span> {r.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Comments;
