class ChangeTimetotakeToBeStringInPrescription < ActiveRecord::Migration[6.0]
  def change
    change_column :prescriptions, :time_to_take, :string
  end
end
