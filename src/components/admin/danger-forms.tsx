"use client";

import { deleteGradeAction, deleteProductAction } from "@/lib/actions/admin-catalogue";
import { deletePincodeAction } from "@/lib/actions/admin-settings";

export function DeleteProductForm({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  return (
    <form
      action={deleteProductAction}
      onSubmit={(e) => {
        if (
          !window.confirm(
            `Delete “${name}”? Its variants will also be removed. Past orders keep their item snapshots.`,
          )
        ) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="btn-outline btn-sm !border-danger-600/40 !text-danger-600 hover:!bg-danger-100">
        Delete Product
      </button>
    </form>
  );
}

export function DeleteGradeForm({ id, name }: { id: string; name: string }) {
  return (
    <form
      action={deleteGradeAction}
      onSubmit={(e) => {
        if (
          !window.confirm(
            `Delete the “${name}” grade? Products linked to it will keep their data but lose the grade link.`,
          )
        ) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="text-[11.5px] font-medium text-danger-600 hover:underline">
        Delete grade
      </button>
    </form>
  );
}

export function DeletePincodeForm({ pincode }: { pincode: string }) {
  return (
    <form
      action={deletePincodeAction}
      onSubmit={(e) => {
        if (!window.confirm(`Delete the PIN rule for ${pincode}?`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="pincode" value={pincode} />
      <button type="submit" className="text-[11.5px] font-medium text-danger-600 hover:underline">
        Delete
      </button>
    </form>
  );
}
