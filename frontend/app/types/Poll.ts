export interface Poll {
  id: number;
  question_text: string;
  description: string;
  status: string;
  pub_date: string;
  start_time: string;
  end_time: any;
  allow_multiple: boolean;
  visibility: string;
  likes_count: number;
  total_votes: number;
  is_owner: boolean;
  user_votes: any[];
  has_liked: boolean;
  choices: Choice[];
}

export interface Choice {
  choice_text: string;
  votes: number;
  id: number;
}
