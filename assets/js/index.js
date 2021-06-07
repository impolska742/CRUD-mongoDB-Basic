const appUrl = "https://calm-headland-70598.herokuapp.com";

$("#add_user").submit(function (event) {
  alert("Data inserted successfully");
});

$("#update_user").submit(function (event) {
  event.preventDefault();
  var unindexed_array = $(this).serializeArray();
  // console.log(unindexed_array);
  var data = {};

  $.map(unindexed_array, function (n, i) {
    data[n["name"]] = n["value"];
  });

  // console.log(data);

  var request = {
    url: appUrl + `/api/users/${data.id}`,
    method: "PUT",
    data: data,
  };

  $.ajax(request).done((response) => {
    alert("Data Updated Successfully");
  });
});

if (window.location.pathname == "/") {
  $onDelete = $(".table tbody td a.delete");
  $onDelete.click(function () {
    var id = $(this).attr("data-id");

    var request = {
      url: appUrl + `/api/users/${id}`,
      method: "DELETE",
    };

    if (confirm("Do you really want to delete this record?")) {
      $.ajax(request).done((response) => {
        alert("Data Deleted Successfully");
        location.reload();
      });
    }
  });
}
